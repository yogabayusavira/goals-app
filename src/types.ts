export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}

export interface FocusBoardData {
  title: string;
  subtitle: string;
  goals: Goal[];
}
