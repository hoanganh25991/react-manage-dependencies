import React, { Component } from "react"
// import logo from "./logo.svg"
// import "./HoiApp.css"
import HoiDependencyList from "../containers/HoiDependencyList"
import HoiCreateGroup from "../containers/HoiCreateGroup"

class App extends Component {
  componentDidMount() {
    let { actionLoadDatabase } = this.props
    actionLoadDatabase()
  }

  render() {
    return (
      <div className="App">
        <HoiDependencyList />
        <HoiCreateGroup />
      </div>
    )
  }
}

export default App
