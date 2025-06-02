import React, { createContext,useContext } from "react";


 export const themeContext= React.createContext({
    themeMode: "light",
    darkTheme: ()=>{},
    lightTheme: ()=>{},

}
)

export const ThemeProvider=themeContext.Provider