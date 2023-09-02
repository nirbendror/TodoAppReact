import { DueDateFilters, TodoItem } from "./interfaces";

// Handle filtering of to-do items based on the selected due date filter (Today, Tommorow, This week, Next week, This month)
const filterHendler = (items: TodoItem[], filterDueDate: DueDateFilters): TodoItem[] => {
    if (filterDueDate === DueDateFilters.All) return items;
    const currentDate = new Date();
  
    switch (filterDueDate) {
      case "Today":
        return items.filter(
          (item) =>
            item.dueDate.getDate() === currentDate.getDate() &&
            item.dueDate.getMonth() === currentDate.getMonth() &&
            item.dueDate.getFullYear() === currentDate.getFullYear()
        );
      case "Tomorrow":
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);
        return items.filter(
          (item) =>
            item.dueDate.getDate() === tomorrowDate.getDate() &&
            item.dueDate.getMonth() === tomorrowDate.getMonth() &&
            item.dueDate.getFullYear() === tomorrowDate.getFullYear()
        );
      case "This week":
        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(currentDate.getDate() + 7);
        return items.filter((item) => item.dueDate <= endOfWeek);
      case "Next week":
        const startOfNextWeek = new Date(currentDate);
        startOfNextWeek.setDate(currentDate.getDate() + 7);
        const endOfNextWeek = new Date(currentDate);
        endOfNextWeek.setDate(currentDate.getDate() + 14);
        return items.filter(
          (item) => item.dueDate >= startOfNextWeek && item.dueDate <= endOfNextWeek
        );
      case "This month":
        const startOfMonth = new Date(currentDate);
        startOfMonth.setDate(1);
        const endOfMonth = new Date(currentDate);
        endOfMonth.setMonth(currentDate.getMonth() + 1);
        endOfMonth.setDate(0);
        return items.filter((item) => item.dueDate >= startOfMonth && item.dueDate <= endOfMonth);
      default:
        return items;
    }
};

export default filterHendler;
