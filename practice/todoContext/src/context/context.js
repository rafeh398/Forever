import { createContext, useContext } from "react";

export const TodoContext=createContext({
  Todos:  [
        {
                id:1,
                todo:"todo Msg",
                completed:false,
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deletedTodo:(id)=>{},
    toggleComplete:(id)=>{},

});



export const useTodo=()=>{
    return useContext(TodoContext);
}

export const TodoProvider=TodoContext.Provider