import { BadgeCheck, CirclePlus, GripVertical, Target, Trash2, createIcons } from "lucide";

const boardIcons = {
  BadgeCheck,
  CirclePlus,
  GripVertical,
  Target,
  Trash2,
};

export function refreshIcons(root: ParentNode = document): void {
  void root;

  createIcons({
    attrs: {
      "aria-hidden": "true",
      width: "18",
      height: "18",
      "stroke-width": "2",
    },
    icons: boardIcons,
    nameAttr: "data-lucide",
  });
}
