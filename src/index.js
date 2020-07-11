import "./styles.css";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./redux/rootReducer";
import thunk from "redux-thunk";
import {
  increment,
  decrement,
  asyncIncrement,
  changeTheme,
} from "./redux/actions";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log(state);
//       console.log(action);
//       return next(action);
//     };
//   };
// }

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

addBtn.addEventListener("click", () => {
  if (store.getState().loading.value === true) {
    return;
  }
  store.dispatch(increment());
});

subBtn.addEventListener("click", () => {
  if (store.getState().loading.value === true) {
    return;
  }
  store.dispatch(decrement());
});

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;
  document.body.className = state.theme.value;
  [addBtn, subBtn, themeBtn].forEach(
    (btn) => (btn.disabled = state.loading.value)
  );
});

store.dispatch({ type: "INIT_APPLICATION" });
