import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext();

const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false
}

const initialState = {
  isDark: getInitialTheme()
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isDark: !state.isDark };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    localStorage.setItem('theme',JSON.stringify(state.isDark))
  },[state.isDark]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
