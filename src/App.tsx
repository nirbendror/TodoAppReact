import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { DueDateFilters, Priority, Status, TodoItem } from "./utils/interfaces";
import TodoItemRow from "./components/TodoItemRow";
import { DueDateFilterSelect, DueDateInput, PrioritySelect, StatusSelect, ToDoTextInput } from "./components/TodoOperations";
import filterHendler from "./utils/filterHendler";
import { sortByPriority } from "./utils/generalUtils";
import { Button, Container, Typography, Box, Divider } from "@mui/material";
import SearchTodo from "./components/SearchTodo";

const App: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemStatus, setNewItemStatus] = useState<Status>(Status.Pending);
  const [newItemPriority, setNewItemPriority] = useState<Priority>(Priority.Medium);
  const [newItemDueDate, setNewItemDueDate] = useState("");
  const [filterDueDate, setFilterDueDate] = useState<DueDateFilters>(DueDateFilters.All);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch data from the API and update the state
  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonblob.com/api/jsonBlob/1147498692516634624");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const rawData: TodoItem[] = await response.json();
      // Convert date strings to Date objects
      const data = rawData.map((item) => ({
        ...item,
        dueDate: new Date(item.dueDate),
        creationTime: new Date(item.creationTime),
      }));
        setItems(data); 
      } catch (error) {
        setItems([]);
        console.error("Error fetching data:", error);
        alert('Error fetching data')
      }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Add a new item to the to-do list
  const handleAddItem = () => {
    const newItem: TodoItem = {
      id: uuidv4(),
      status: newItemStatus,
      text: newItemText,
      priority: newItemPriority,
      dueDate: new Date(newItemDueDate),
      creationTime: new Date(),
    };

    setItems((prevItems) => [...prevItems, newItem]);
    resetTodoOptionsState();

    // If I have a backend I will implement here a post request with the new data.
  };

  const resetTodoOptionsState = () => {
    setNewItemText("");
    setNewItemStatus(Status.Pending);
    setNewItemPriority(Priority.Medium);
    setNewItemDueDate("");
  }

  // Delete an item from the to-do list
  const handleDeleteItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    // If I have a backend I will implement here a remove request with the new data.

  };

  // Edit an existing item in the to-do list
  const handleEditItem = (itemId: string, updatedStatus: Status, updatedText: string, updatedPriority: Priority, updatedDueDate: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: updatedStatus,
              text: updatedText,
              priority: updatedPriority,
              dueDate: new Date(updatedDueDate),
            }
          : item
      )
    );
    // If I have a backend I will implement here a put request with the new data.
  };

  // Filter daya by due date - default is all data 
  const filteredItems = filterHendler(items, filterDueDate);

  // Sorting data by priority from High to Low
  const sortedItems = sortByPriority(filteredItems);

  // Search hendling 
  const itemsToDisplay = sortedItems.filter(item => item.text.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  // Each Todo must includes both text and due date
  const isAddButtonDisabled = newItemText.trim() === "" || !newItemDueDate;

  return (
    <Container>
      <Typography variant="h2" className="title-text">My To-Do List</Typography>
      <Box className="main-container">
        <ToDoTextInput value={newItemText} onChange={setNewItemText} placeholder="Create New task..."/>
        <StatusSelect value={newItemStatus} onChange={setNewItemStatus}/>
        <PrioritySelect value={newItemPriority} onChange={setNewItemPriority} />
        <DueDateInput value={newItemDueDate} onChange={setNewItemDueDate} />
        <Button sx={{ width: '10%', marginX: '3px'}} disabled={isAddButtonDisabled} onClick={handleAddItem} variant="contained">Add Item</Button>
      </Box>
      <Box className="search-container">
        <SearchTodo searchTerm={searchTerm} setSearchTerm={setSearchTerm} isDisabled={sortedItems.length === 0} />
        <DueDateFilterSelect value={filterDueDate} onChange={setFilterDueDate} />
      </Box>
      <Typography variant="h4" className="title-text">Total items: {itemsToDisplay.length}</Typography>
      <Divider sx={{width: "40%", marginX:'auto', backgroundColor: 'silver'}}/>

      <Box>
        {itemsToDisplay.map((item) => (
          <TodoItemRow
            key={item.id}
            item={item}
            onDelete={() => handleDeleteItem(item.id)}
            onEdit={handleEditItem}
          />
        ))}
      </Box>
    </Container>
  );
};

export default App;
