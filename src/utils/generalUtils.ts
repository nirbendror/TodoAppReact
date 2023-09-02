import { priorityOrder } from "./const";
import { TodoItem } from "./interfaces";

// Sort the to-to items by priority from high to low
export const sortByPriority = (items: TodoItem[]): TodoItem[] => {
    return items.slice().sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
};