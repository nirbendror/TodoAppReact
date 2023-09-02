
import React, { useState } from "react";
import { TodoItemProps } from "../utils/interfaces";
import { DueDateInput, PrioritySelect, StatusSelect, ToDoTextInput } from "./TodoOperations";
import {Button, Divider, Typography} from "@mui/material";
import './css/TodoItemRow.css'

// Component represents a single to-do item row in the to-do list
// It displays the item details and provides options to edit or delete
const TodoItemRow: React.FC<TodoItemProps> = ({ item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [editedStatus, setEditedStatus] = useState(item.status);
  const [editedPriority, setEditedPriority] = useState(item.priority);
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate.toISOString().split("T")[0]);

  const handleSave = () => {
    onEdit(item.id, editedStatus, editedText, editedPriority, editedDueDate);
    setIsEditing(false);
  };

  return (
    <div>
      <Divider sx={{marginY: 2} }/>
      {!isEditing ? (
        <div className="item-container">
          <Typography variant="subtitle2" className="item-text" sx={{width: '30%'}}>{item.text}</Typography>
          <Typography variant="subtitle2" className="item-text">Status: {item.status}</Typography>
          <Typography variant="subtitle2" className="item-text">Priority: {item.priority}</Typography>
          <Typography variant="subtitle2" className="item-text">Due: {item.dueDate.toLocaleDateString()}</Typography>
          <Typography variant="subtitle2" className="item-text">Created: {item.creationTime.toLocaleString().split(",")[0]}</Typography>
          <Button variant="contained" size="small" onClick={() => setIsEditing(true)}>Edit</Button>
          <Button variant="contained" size="small" onClick={onDelete}>Delete</Button>
        </div>
      ) : (
        <div>
          <ToDoTextInput value={editedText} onChange={setEditedText} placeholder="Etid Todo Name"/>
          <StatusSelect value={editedStatus} onChange={setEditedStatus} />
          <PrioritySelect value={editedPriority} onChange={setEditedPriority} />
          <DueDateInput value={editedDueDate} onChange={setEditedDueDate} />
          <Button sx={{height: '55px', marginX:1}} variant="contained" size="large" onClick={handleSave}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default TodoItemRow;

