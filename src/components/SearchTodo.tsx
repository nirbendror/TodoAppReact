import React from "react";
import { TextField } from "@mui/material";
import { SearchTodoProps } from "../utils/interfaces";

const SearchTodo: React.FC<SearchTodoProps> = ({searchTerm, setSearchTerm, isDisabled}) => {

    const handleSearchTermChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm)
    }

    return (
          <TextField
            type="text"
            className="search-input"
            label="Search a Todo"
            variant="standard"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            sx={{ width: '50%', marginX: '20px'}}
            disabled={isDisabled}
          />
      );
}


export default SearchTodo;

