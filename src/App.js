import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./App.css"
import DependencyList from "./components/DependencyList"
import HoiPanel from "./containers/HoiPanel"
import { actionLoadDatabase } from "./actions"

class App extends Component {
  componentDidMount() {
    //actionLoadDatabase();
  }

  render() {
    return (
      <div className="App">
        <HoiPanel />
        <DependencyList />
        <div className="App-logo">Hello world</div>
      </div>
    )
  }
}

export default App
