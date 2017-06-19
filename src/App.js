import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./App.css"
import DependencyList from "./components/DependencyList"
import HoiPanel from "./containers/HoiPanel"
import { actionLoadDatabase } from "./actions"
import CodeEditor from "./components/CodeEditor"
import CreateGroup from "./components/CreateGroup"

class App extends Component {
  componentDidMount() {
    //actionLoadDatabase();
  }

  render() {
    return (
      <div className="App">
        <DependencyList />
        <CreateGroup />
      </div>
    )
  }
}

export default App
