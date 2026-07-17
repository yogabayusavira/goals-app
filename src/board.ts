import type { FocusBoardData, Goal } from "./types";
import { loadBoard, saveBoard } from "./storage";
import { refreshIcons } from "./icons";

const titleElement = getElement<HTMLHeadingElement>("#title");
const subtitleElement = getElement<HTMLParagraphElement>("#subtitle");
const progressBar = getElement<HTMLDivElement>("#progressBar");
const progressText = getElement<HTMLDivElement>("#progressText");
const goalList = getElement<HTMLDivElement>("#goalList");
const addGoalForm = getElement<HTMLFormElement>("#addGoalForm");
const goalInput = getElement<HTMLInputElement>("#goalInput");

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Goals App markup is missing ${selector}.`);
  }

  return element;
}

let board: FocusBoardData = {
  title: "MVP by Monday",
  subtitle: "Cold Calling App",
  goals: [],
};

let draggedGoalId: string | null = null;
let saveTimer: number | undefined;

export async function startBoard(): Promise<void> {
  board = normalizeBoard(await loadBoard());
  bindEditable(titleElement, "title");
  bindEditable(subtitleElement, "subtitle");
  bindAddGoal();
  render();
}

function normalizeBoard(data: FocusBoardData): FocusBoardData {
  return {
    title: data.title || "MVP by Monday",
    subtitle: data.subtitle || "Cold Calling App",
    goals: [...(data.goals || [])]
      .sort((a, b) => a.order - b.order)
      .map((goal, index) => ({ ...goal, order: index })),
  };
}

function render(): void {
  titleElement.textContent = board.title;
  subtitleElement.textContent = board.subtitle;
  renderProgress();
  renderGoals();
  refreshIcons(document);
}

function renderProgress(): void {
  const total = board.goals.length;
  const complete = board.goals.filter((goal) => goal.completed).length;
  const percent = total === 0 ? 0 : Math.round((complete / total) * 100);

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${percent}% Complete - ${complete}/${total} Goals`;
}

function renderGoals(): void {
  goalList.replaceChildren();

  board.goals.forEach((goal) => {
    const item = document.createElement("article");
    item.className = `goal${goal.completed ? " goal--complete" : ""}`;
    item.draggable = true;
    item.dataset.id = goal.id;

    item.addEventListener("dragstart", (event) => {
      draggedGoalId = goal.id;
      item.classList.add("goal--dragging");
      event.dataTransfer?.setData("text/plain", goal.id);
      event.dataTransfer?.setDragImage(item, 24, 24);
    });

    item.addEventListener("dragend", () => {
      draggedGoalId = null;
      item.classList.remove("goal--dragging");
      goalList.querySelectorAll(".goal--over").forEach((node) => node.classList.remove("goal--over"));
    });

    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (draggedGoalId && draggedGoalId !== goal.id) {
        item.classList.add("goal--over");
      }
    });

    item.addEventListener("dragleave", () => item.classList.remove("goal--over"));

    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("goal--over");
      if (draggedGoalId && draggedGoalId !== goal.id) {
        moveGoal(draggedGoalId, goal.id);
      }
    });

    const handle = document.createElement("button");
    handle.className = "goal__handle";
    handle.type = "button";
    handle.ariaLabel = "Drag goal";
    const handleIcon = document.createElement("i");
    handleIcon.dataset.lucide = "grip-vertical";
    handle.append(handleIcon);

    const checkbox = document.createElement("button");
    checkbox.className = "goal__check";
    checkbox.type = "button";
    checkbox.ariaLabel = goal.completed ? "Mark incomplete" : "Mark complete";
    checkbox.ariaPressed = String(goal.completed);
    if (goal.completed) {
      const checkIcon = document.createElement("i");
      checkIcon.dataset.lucide = "badge-check";
      checkbox.append(checkIcon);
    }
    checkbox.addEventListener("click", () => toggleGoal(goal.id));

    const text = document.createElement("span");
    text.className = "goal__text";
    text.textContent = goal.text;

    const remove = document.createElement("button");
    remove.className = "goal__delete";
    remove.type = "button";
    remove.ariaLabel = `Delete ${goal.text}`;
    const removeIcon = document.createElement("i");
    removeIcon.dataset.lucide = "trash-2";
    remove.append(removeIcon);
    remove.addEventListener("click", () => deleteGoal(goal.id));

    item.append(handle, checkbox, text, remove);
    goalList.append(item);
  });
}

function bindAddGoal(): void {
  addGoalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = goalInput.value.trim();

    if (!text) {
      return;
    }

    board.goals.push({
      id: crypto.randomUUID(),
      text,
      completed: false,
      order: board.goals.length,
    });

    goalInput.value = "";
    persistAndRender();
  });
}

function bindEditable(element: HTMLElement, field: "title" | "subtitle"): void {
  element.addEventListener("click", () => beginEdit(element, field));
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      beginEdit(element, field);
    }
  });
}

function beginEdit(element: HTMLElement, field: "title" | "subtitle"): void {
  const input = document.createElement("input");
  input.className = `inline-edit inline-edit--${field}`;
  input.value = board[field];
  input.maxLength = field === "title" ? 48 : 72;

  element.replaceWith(input);
  input.focus();
  input.select();

  const commit = () => {
    const nextValue = input.value.trim() || board[field];
    board[field] = nextValue;
    input.replaceWith(element);
    persistAndRender();
  };

  input.addEventListener("blur", commit, { once: true });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      input.blur();
    }

    if (event.key === "Escape") {
      input.value = board[field];
      input.blur();
    }
  });
}

function toggleGoal(id: string): void {
  board.goals = board.goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal));
  persistAndRender();
}

function deleteGoal(id: string): void {
  board.goals = board.goals.filter((goal) => goal.id !== id);
  updateOrder();
  persistAndRender();
}

function moveGoal(activeId: string, targetId: string): void {
  const from = board.goals.findIndex((goal) => goal.id === activeId);
  const to = board.goals.findIndex((goal) => goal.id === targetId);

  if (from < 0 || to < 0) {
    return;
  }

  const [goal] = board.goals.splice(from, 1);
  board.goals.splice(to, 0, goal);
  updateOrder();
  persistAndRender();
}

function updateOrder(): void {
  board.goals = board.goals.map((goal, index) => ({ ...goal, order: index }));
}

function persistAndRender(): void {
  updateOrder();
  render();
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    void saveBoard(board);
  }, 80);
}
