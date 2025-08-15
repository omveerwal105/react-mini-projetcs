import { createContext, useReducer, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext();

const initialState = {
  expenses: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const newExpense = { ...action.payload, id: Date.now() };
      return {
        ...state,
        expenses: [...state.expenses, newExpense]
      };
    }
    case "DELETE": {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        )
      };
    }
    case "EDIT": {
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? { ...expense, ...action.payload.updatedData }
            : expense
        )
      };
    }
    default:
      return state;
  }
};

const init = () => {
  const storedData = localStorage.getItem("expenses");
  return {
    expenses: storedData ? JSON.parse(storedData) : []
  };
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
