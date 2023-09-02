export enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low",
  }

export enum Status {
    Pending = "Pending",
    Active = "Active",
    Completed = "Completed",
}
  
export interface TodoItem {
    id: string;
    status: Status;
    text: string;
    priority: Priority;
    dueDate: Date;
    creationTime: Date;
}

export interface SearchTodoProps{
  searchTerm: string,
  setSearchTerm: (newVal: string) => void
  isDisabled: boolean;
}
  
export enum DueDateFilters {
    All = "All",
    Today = "Today",
    Tomorrow = "Tomorrow",
    ThisWeek = "This week",
    NextWeek = "Next week",
    ThisMonth = "This month",
}

export interface TodoItemProps {
    item: TodoItem;
    onDelete: () => void;
    onEdit: (
      itemId: string,
      updatedStatus: Status,
      updatedText: string,
      updatedPriority: Priority,
      updatedDueDate: string
    ) => void;
}
  
export interface PrioritySelectProps {
    value: Priority;
    onChange: (value: Priority) => void;
}

export interface StatusSelectProps {
  value: Status;
  onChange: (value: Status) => void;
}

export interface ToDoTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface DueDateFilterSelectProps {
  value: DueDateFilters;
  onChange: (value: DueDateFilters) => void;
}

export interface DueDateInputProps {
  value: string;
  onChange: (value: string) => void;
}