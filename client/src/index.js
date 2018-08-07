import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./configureStore";
import Root from "./components/Root";
import { login } from "./actions/auth";

const store = configureStore();
store.dispatch(login);
ReactDOM.render(<Root store={store} />, document.getElementById("root"));
