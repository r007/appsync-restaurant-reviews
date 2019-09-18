import React, { useReducer } from 'react';

const NavContext = React.createContext({
  toastrIsOpen: false,
  createRestaurantIsOpen: false
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, [action.nav]: true };
    case 'close':
      return { ...state, [action.nav]: false };
    default:
      return { ...state, [action.nav]: !state[action.nav] };
  }
};

export const NavContextProvider = ({ children }) => {
  const [{ toastrIsOpen, createRestaurantIsOpen }, dispatch] = useReducer(reducer, {
    toastrIsOpen: false,
    createRestaurantIsOpen: false
  });

  const toggleNavState = (nav, type) => {
    dispatch({ nav, type });
  };

  return (
    <NavContext.Provider
      value={{
        toastrIsOpen,
        createRestaurantIsOpen,
        toggleNavState
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavContext;
