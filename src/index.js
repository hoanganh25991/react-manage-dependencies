import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"

import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"

import reducers from "./reducers"

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
