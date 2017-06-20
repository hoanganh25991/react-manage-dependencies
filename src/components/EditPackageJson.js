import React from "react"
import * as t from "../styles"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

export default class EditPackageJson extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: "view" }
  }

  loadPickUp = packageJson => {
    // As type check, packageSelected can be any thing
    // Assign it as obj
    let { packageSelected = {} } = this.props
    try {
      let packageObj = JSON.parse(packageJson)

      return (
        <div style={{ ...t.height300, ...t.scrollY, ...t.widthFull }}>
          {Object.keys(packageObj).map(level1Key => {
            let level1Val = packageObj[level1Key]

            let isStr = typeof level1Val === "string"

            let chosen = Boolean(packageSelected[level1Key])

            if (isStr) {
              return (
                <div {...{ level1Key }}>
                  <input
                    type="checkbox"
                    checked={chosen}
                    onClick={this.togglePickWholeLevel1({ [level1Key]: packageObj[level1Key] })}
                  />
                  <b>{level1Key}</b> {level1Val}
                </div>
              )
            }

            return (
              <div {...{ level1Key }}>
                <div>
                  <input
                    type="checkbox"
                    checked={chosen}
                    onClick={this.togglePickWholeLevel1({ [level1Key]: packageObj[level1Key] })}
                  />
                  <b>{level1Key}</b>
                </div>
                <ul>
                  {Object.keys(level1Val).map(level2Key => {
                    let chosen = Boolean(packageSelected[level1Key] && packageSelected[level1Key][level2Key])
                    return (
                      <div {...{ key: level2Key }}>
                        <input
                          type="checkbox"
                          checked={chosen}
                          onClick={this.togglePickUpLevel2(level1Key, {
                            [level2Key]: packageObj[level1Key][level2Key]
                          })}
                        />
                        <b>{level2Key}</b> {level1Val[level2Key]}
                      </div>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )
    } catch (err) {
      return <div>Parse error. Please recheck your package.json file</div>
    }
  }

  togglePickWholeLevel1 = ({ level1 }) => () => {
    let { packageSelected: curr = {}, actionUpdatePackagedSelected } = this.props
    let packageSelected = { ...curr, ...level1 }
    actionUpdatePackagedSelected(packageSelected)
  }

  togglePickUpLevel2 = (level1Key, level2) => () => {
    let { packageSelected: curr = {}, actionUpdatePackagedSelected } = this.state
    let currLevel1 = curr[level1Key] || {}
    let level1 = { ...currLevel1, ...level2 }
    let packageSelected = { ...curr, ...{ [level1Key]: level1 } }
    actionUpdatePackagedSelected(packageSelected)
  }

  toggleViewMode = () => {
    let { mode: currMode } = this.state
    let mode = currMode === "view" ? "edit" : "view"
    this.setState({ mode })
  }

  render() {
    let { packageJson } = this.props
    let { mode } = this.state
    let isViewMode = mode === "view"
    return (
      <div>
        <button onClick={this.toggleViewMode}>{"<>"}</button>
        <div style={{ ...t.flexRow }}>
          {isViewMode
            ? <div style={{ ...t.flex1 }}>
                {this.loadPickUp(packageJson)}
              </div>
            : <div style={{ ...t.flex1, ...t.flexColumn }}>
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
