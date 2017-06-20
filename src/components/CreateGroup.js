// @flow
import React from "react"
import * as t from "../styles"
import HoiEditPackageJson from "../containers/HoiEditPackageJson"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"

type Props = {
  groupName: string,
  packageJson: string,
  actionUpdatePackageJson: Function,
  actionUpdateGroupName: Function,
  actionUpdateSnippet: Function,
  actionCreateGroup: Function
}

type State = {}

type Event = {
  target: {
    value: string
  }
}

type FileEvent = {
  target: {
    files: Array<Blob>
  }
}

export default class CreateGroup extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  updateGroupName = (e: Event) => {
    let groupName = e.target.value
    let { actionUpdateGroupName } = this.props
    actionUpdateGroupName({ groupName })
  }

  updatePackageJson = (e: FileEvent) => {
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

  updateSnippet = (snippet: string) => {
    let { actionUpdateSnippet } = this.props
    actionUpdateSnippet({ snippet })
  }

  createGroup = () => {
    let { actionCreateGroup } = this.props
    actionCreateGroup()
  }

  render() {
    let { groupName, packageJson } = this.props
    return (
      <div style={t.flexColumn}>
        <h1>Create group</h1>
        <b>Group name</b>
        <input type="text" value={groupName} onChange={this.updateGroupName} />
        <b>Load package.json</b>
        <input type="file" onChange={this.updatePackageJson} />
        <HoiEditPackageJson packageJson={packageJson} />
        <b>Snippet</b>
        <CodeMirror
          value={"Type in your snippet"}
          onChange={this.updateSnippet}
          options={{ lineNumbers: true, mode: "javascript" }}
        />
        <div>
          <button onClick={this.createGroup}>Create</button>
        </div>
      </div>
    )
  }
}
