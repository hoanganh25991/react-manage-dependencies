import React from "react"
import * as t from "../styles"
import EditPackageJson from "./EditPackageJson"

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: "",
      packageJson: "",
      packageSelected: {}
    }
  }

  setGroupName = e => {
    let groupName = e.target.value
    this.setState({ groupName })
    this.props = {}
  }

  readPackageJson = e => {
    let file = e.target.files[0]
    if (file) {
      let packageJsonPromise = new Promise(resolve => {
        let fr = new FileReader()
        fr.readAsText(file)
        fr.onload = processEvent => resolve(processEvent.target.result)
      })

      packageJsonPromise.then(packageJson => {
        try {
          this.setState({ packageJson })
        } catch (err) {
          console.log(err)
        }
      })
    }
  }

  updateCodeMirror = packageJson => {
    this.setState({ packageJson })
  }

  render() {
    let { groupName, packageJson } = this.state
    /// value mirror not update
    return (
      <div style={t.flexColumn}>
        <h1>Create group</h1>
        <h3>Group name</h3>
        <input type="text" value={groupName} onChange={this.setGroupName} />
        <h3>Load package.json</h3>
        <input type="file" onChange={this.readPackageJson} />
        <EditPackageJson packageJson={packageJson} />
      </div>
    )
  }
}
