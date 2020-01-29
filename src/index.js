/* eslint-disable*/
import React from "react";
import ReactDOM from "react-dom";

//redux 이용하기
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/modules";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const devTools =
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
console.log(store.getState());
// **** 리덕스 개발자도구 적용
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//for pwa, register()
serviceWorker.register();
