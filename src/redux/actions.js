import { INCREMENT, DECREMENT, CHANGE_THEME, CHANGE_LOADING } from "./types";

export function increment() {
  return {
    type: INCREMENT,
  };
}
export function decrement() {
  return {
    type: DECREMENT,
  };
}
export function asyncIncrement() {
  return function (dispatch) {
    dispatch(changeLoading(true));
    setTimeout(() => {
      dispatch(increment());
      dispatch(changeLoading(false));
    }, 15000);
  };
}
export function changeTheme(theme) {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
}

export function changeLoading(loadingState) {
  return {
    type: CHANGE_LOADING,
    payload: loadingState,
  };
}
