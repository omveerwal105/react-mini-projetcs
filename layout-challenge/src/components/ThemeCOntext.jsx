import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [themeMode , setThemeMode] = useState('light');

    const toggleTheme = () => {
        setThemeMode((prev)=>prev === 'light'? 'dark' : 'light');
    }
    return (
        <ThemeContext.Provider value={{themeMode , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};