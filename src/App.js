import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import DependencyList from "./components/DependencyList"
import HoiPanel from "./containers/HoiPanel"

class App extends Component {
  render() {
    return (
      <div className="App">
        <HoiPanel />
        <DependencyList />
      </div>
    )
  }
}

export default App
