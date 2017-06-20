import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./HoiApp.css"
import DependencyList from "./DependencyList"
import HoiPanel from "../containers/HoiPanel"
import CodeEditor from "./CodeEditor"
import CreateGroup from "./CreateGroup"

class App extends Component {
  componentDidMount() {
    let { actionLoadDatabase } = this.props
    actionLoadDatabase()
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
