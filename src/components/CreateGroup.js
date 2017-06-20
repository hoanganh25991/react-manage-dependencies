import React from "react"
import * as t from "../styles"
import HoiEditPackageJson from "../containers/HoiEditPackageJson"

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  updateGroupName = e => {
    let groupName = e.target.value
    let { actionUpdateGroupName } = this.props
    actionUpdateGroupName({ groupName })
  }

  updatePackageJson = e => {
    let file = e.target.files[0]
    if (file) {
      let packageJsonPromise = new Promise(resolve => {
        let fr = new FileReader()
        fr.readAsText(file)
        fr.onload = event => resolve(event.target.result)
      })

      packageJsonPromise.then(packageJson => {
        let { actionUpdatePackageJson } = this.props
        actionUpdatePackageJson({ packageJson })
      })
    }
  }

  render() {
    let { groupName, packageJson } = this.state
    return (
      <div style={t.flexColumn}>
        <h1>Create group</h1>
        <h3>Group name</h3>
        <input type="text" value={groupName} onChange={this.updateGroupName} />
        <h3>Load package.json</h3>
        <input type="file" onChange={this.updatePackageJson} />
        <HoiEditPackageJson packageJson={packageJson} />
      </div>
    )
  }
}
