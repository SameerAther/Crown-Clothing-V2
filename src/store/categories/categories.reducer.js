// Import category action types from separate file
import CATEGORIES_ACTION_TYPES from "./categories.types";

// Define initial state for categories reducer
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// Define the categories reducer function
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    // If the action type is to set the categories, return a new state object with the categories property set to the payload value
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    // If the action type is not recognized, return the current state object
    default:
      return state;
  }
};
