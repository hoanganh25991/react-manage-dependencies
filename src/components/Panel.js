import React, { PureComponent } from "react"

export default class Panel extends PureComponent {
  loadDatabase = () => {
    let { actionLoadDatabase } = this.props
    actionLoadDatabase()
  }

  render() {
    return (
      <div>
        <button onClick={this.loadDatabase}>add group</button>
      </div>
    )
  }
}
