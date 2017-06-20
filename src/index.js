import React from "react"
import ReactDOM from "react-dom"

import HoiCreateGroup from "./containers/HoiCreateGroup"
import HoiRouter from "./containers/HoiRouter"
import registerServiceWorker from "./registerServiceWorker"

import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"

import { Route, Link } from "react-router-dom"

import reducers from "./reducers"

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

const Home = () => <div>Home</div>

ReactDOM.render(
  <Provider store={store}>
    <HoiRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-group">Create Group</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route exact path="/create-group" component={HoiCreateGroup} />
      </div>
    </HoiRouter>
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
