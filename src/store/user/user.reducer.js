// Import user action types from separate file
import USER_ACTION_TYPES from './user.types';

// Define initial state for user reducer
export const USER_INITIAL_STATE = {
  currentUser: null,
};

// Define the user reducer function
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    // If the action type is to set the current user, return a new state object with the currentUser property set to the payload value
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    // If the action type is not recognized, return the current state object
    default:
      return state;
  }
};
