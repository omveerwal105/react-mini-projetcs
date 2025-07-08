import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme,setTheme] = useState();
    const toggle = ()=>{
        setTheme((prevTheme)=>(prevTheme === "light" ? "dark" : "light"));
    };
    return (
        <ThemeContext.Provider value={{theme , toggle}}>
            {children}
        </ThemeContext.Provider>

    );
};