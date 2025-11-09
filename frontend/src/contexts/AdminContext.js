import { createContext, useContext, useReducer, useEffect } from 'react';

const AdminContext = createContext();

const initialState = {
  totalParticipants: 0,
  activeParticipants: 0,
  loading: false,
  error: null
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        totalParticipants: action.payload.total,
        activeParticipants: action.payload.active
      };
    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const value = {
    state,
    dispatch
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}