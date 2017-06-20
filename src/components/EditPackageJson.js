// @flow
import React from "react"
import * as t from "../styles"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"
import DependencyPickUp from "./DependencyPickUp"

type Props = {
  packageJson: string,
  packageSelected: Object,
  actionUpdatePackageJson: Function,
  actionUpdatePackageSelected: Function
}

type State = {
  mode: string
}

export default class EditPackageJson extends React.Component {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = { mode: "view" }
  }

  toggleViewMode = () => {
    let { mode: currMode } = this.state
    let mode = currMode === "view" ? "edit" : "view"
    this.setState({ mode })
  }

  resetSelected = () => {
    let { actionUpdatePackageSelected } = this.props
    actionUpdatePackageSelected({ packageSelected: {} })
  }

  updateCodeMirror = (newCode: string) => {
    let packageJson = newCode
    let { actionUpdatePackageJson } = this.props
    actionUpdatePackageJson({ packageJson })
  }

  render() {
    let { packageJson, packageSelected } = this.props
    let { actionUpdatePackageSelected } = this.props
    let { mode } = this.state
    let isViewMode = mode === "view"
    return (
      <div>
        <button onClick={this.toggleViewMode}>{"switch view"}</button>
        <button onClick={this.resetSelected}>{"reset selected"}</button>
        <div style={{ ...t.flexRow }}>
          {isViewMode
            ? <div style={{ ...t.flex1, ...t.unSelect, ...t.devBorder }}>
                <DependencyPickUp {...{ packageJson, packageSelected, actionUpdatePackageSelected }} />
              </div>
            : <div style={{ ...t.flex1, ...t.flexColumn, ...t.devBorder }}>
                <CodeMirror
                  value={packageJson}
                  options={{ lineNumbers: true, mode: "javascript" }}
                  onChange={this.updateCodeMirror}
                />
              </div>}
        </div>
      </div>
    )
  }
}
