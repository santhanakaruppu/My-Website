import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import IncDec from "./IncDec";
import todo from "./ToDo";
import { reducer as formReducer } from "redux-form";

const store = configureStore({
  reducer: {
    IncDec: IncDec.reducer,
    todo: todo.reducer,
    form: formReducer,
  },
});

export default store;
