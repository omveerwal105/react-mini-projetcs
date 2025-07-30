import { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();

const themeReducer = (themeState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                theme:  !themeState.theme
            };
       
        default:
            return themeState;
    }

}
export const ThemeProvider = ({ children }) => {
    const [storedTheme , setStoredTheme] = useLocalStorage('theme',false)
    const [themeState, dispatchTheme] = useReducer(themeReducer, { theme: storedTheme });

    useEffect(()=>{
        setStoredTheme(themeState.theme);
    },[themeState.theme , setStoredTheme])

    return (
        <ThemeContext.Provider value={{ themeState, dispatchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}