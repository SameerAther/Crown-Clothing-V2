// Import necessary functions and libraries for setting up a Redux store
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; // Middleware that logs actions and state changes to the console
import { persistReducer, persistStore } from "redux-persist"; // Library for persisting Redux store to local storage
import storage from "redux-persist/lib/storage"; // Local storage implementation

import { rootReducer } from "./root-reducer"; // Import root reducer function

// Define an array of middleware to be applied to the store
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(Boolean);
// If the environment is development, add the logger middleware to the array of middleware

const persistConfig = {
  key: "root", // Key under which the persisted state will be stored
  storage, // Storage engine used to persist state
  blacklist: ["user"], // Array of reducers to exclude from persisting
};

// Define the enhancer used to compose the store
const composeEnhancer =
  (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create the persisted reducer using the root reducer and persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Compose the middleware and enhancer into a single function
const composedEnhanders = composeEnhancer(applyMiddleware(...middleWares));

// Create the Redux store with the persisted reducer and composed enhancer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhanders
);
// Create the persistor used to persist the store to local storage
export const persistor = persistStore(store);
