// CRA
import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

// Redux
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers"

// Router
import { Route, Link } from "react-router-dom"

// Component
import HoiCreateGroup from "./containers/HoiCreateGroup"
import HoiRouter from "./containers/HoiRouter"
import HoiDebug from "./containers/HoiDebug"

// Create store for redux
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

// Simple component to test
const Home = () => <div>Home</div>

ReactDOM.render(
  <Provider store={store}>
    <HoiRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-group">Create Group</Link></li>
          <HoiDebug />
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
