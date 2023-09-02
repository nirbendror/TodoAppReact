import { DueDateFilters, Priority, Status } from "./interfaces";

export const dueDateFilterOptions: Array<DueDateFilters> = [
    DueDateFilters.All,
    DueDateFilters.Today,
    DueDateFilters.Tomorrow,
    DueDateFilters.ThisWeek,
    DueDateFilters.NextWeek,
    DueDateFilters.ThisMonth,
];
  
export const priorityOptions: Array<Priority> = [
    Priority.High,
    Priority.Medium,
    Priority.Low,
];

export const statusOptions: Array<Status> = [
    Status.Pending,
    Status.Active,
    Status.Completed,
];

export const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
};