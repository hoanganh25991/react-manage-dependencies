import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./App.css"
import DependencyList from "./components/DependencyList"
import HoiPanel from "./containers/HoiPanel"
import { actionLoadDatabase } from "./actions"
import CodeEditor from "./components/CodeEditor"

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
        <CodeEditor />
      </div>
    )
  }
}

export default App
