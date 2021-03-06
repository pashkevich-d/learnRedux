import { INCREMENT, DECREMENT, CHANGE_THEME, CHANGE_LOADING } from "./types";
import { combineReducers } from "redux";

function counterReducer(state = 0, action) {
  if (action.type === INCREMENT) {
    return state + 1;
  } else if (action.type === DECREMENT) {
    return state - 1;
  }

  return state;
}

const initialThemeState = {
  value: "light",
};

function themeReducer(state = initialThemeState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };

    default:
      return state;
  }
}

const loading = {
  value: false,
};

function loadingReducer(state = loading, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return { ...state, value: action.payload };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  loading: loadingReducer,
});
