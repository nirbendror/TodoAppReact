import { dueDateFilterOptions, priorityOptions, statusOptions } from "../utils/const";
import { DueDateFilterSelectProps, DueDateFilters, DueDateInputProps, Priority, PrioritySelectProps, Status, StatusSelectProps, ToDoTextInputProps } from "../utils/interfaces";
import { Select, MenuItem, TextField, FormControl, InputLabel } from "@mui/material";

// Displays a dropdown select menu to choose the priority
export function PrioritySelect({ value, onChange }: PrioritySelectProps) {
    return (
      <FormControl sx={{ width: '18%', marginX: '5px'}}>
        <InputLabel variant="standard">Select Priority</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as Priority)}
                variant="standard"
                size="medium"
            >
                {priorityOptions.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                        {priority}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

// Displays a dropdown select menu to choose the todo status
export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <FormControl sx={{ width: '18%', marginX: '5px'}}>
      <InputLabel variant="standard">Select Status</InputLabel>
          <Select
              value={value}
              onChange={(e) => onChange(e.target.value as Status)}
              variant="standard"
          >
              {statusOptions.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                      {priority}
                  </MenuItem>
              ))}
          </Select>
      </FormControl>
  );
}



// Displays a dropdown select menu to filter to-do items based on their due dates
export function DueDateFilterSelect({ value, onChange }: DueDateFilterSelectProps) {
    return (
        <FormControl sx={{ width: '25%', marginX: '5px'}}>
            <InputLabel variant="standard">Filter By Due Date</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as DueDateFilters)}
                variant="standard"
            >
                {dueDateFilterOptions.map((dueDate) => (
                    <MenuItem key={dueDate} value={dueDate}>
                        {dueDate}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

// displays an input field to enter the due date
export function DueDateInput({ value, onChange }: DueDateInputProps) {
    return (
        
      <TextField      
        sx={{ width: '18', marginX: '5px'}}
        type="date"
        label="* Due Date"
        variant="standard"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputLabelProps={{
            shrink: true,
          }}
     />    
    );
}

// displays an input field to enter the text content of a new to-do item
// It can also be used as a general input field for text
export function ToDoTextInput({ value, onChange, placeholder }: ToDoTextInputProps) {
    return (
        <TextField
            sx={{ width: '35%', marginX: '5px'}}
            type="text"
            label={'* '+placeholder}
            variant="standard"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
