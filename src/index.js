import React from "react"
import ReactDOM from "react-dom"
import HoiApp from "./containers/HoiApp"
import registerServiceWorker from "./registerServiceWorker"

import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"

import reducers from "./reducers"

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <HoiApp />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
