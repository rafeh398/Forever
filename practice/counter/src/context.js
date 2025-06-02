import { createContext,useContext } from "react";

 export const TodoContext=createContext(0);

 export const useTodo = () => {
    return useContext(TodoContext)
}


export const TodoProvider=TodoContext.Provider
 
