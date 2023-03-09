// Import cart action types from separate file
import { CART_ACTION_TYPES } from "./cart.types";

// Define initial state for cart reducer
export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

// Define the cart reducer function
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    // If the action type is to set the cart items, return a new state object with the cartItems property set to the payload value
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    // If the action type is to set whether the cart is open or not, return a new state object with the isCartOpen property set to the payload value
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    // If the action type is not recognized, return the current state object
    default:
      return state;
  }
};
