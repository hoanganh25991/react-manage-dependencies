// @flow
import React from "react"
import * as t from "../styles"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

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

  loadPickUp = (packageJson: string) => {
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
                <div {...{ key: level1Key }}>
                  <input
                    type="checkbox"
                    checked={chosen}
                    onChange={this.togglePickWholeLevel1({ [level1Key]: packageObj[level1Key] })}
                  />
                  <b>{level1Key}</b> {level1Val}
                </div>
              )
            }

            return (
              <div {...{ key: level1Key }}>
                <div>
                  <input
                    type="checkbox"
                    checked={chosen}
                    onChange={this.togglePickWholeLevel1({ [level1Key]: packageObj[level1Key] })}
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
                          onChange={this.togglePickUpLevel2(level1Key, {
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

  togglePickWholeLevel1 = (level1: Object) => {
    let { packageSelected: curr = {}, actionUpdatePackageSelected } = this.props
    // Check if level1 already selected
    // let {obj: [level1Key]} = level1;
    let level1Key = Object.keys(level1)[0]
    let alreadyExist = curr[level1Key]

    let packageSelected

    if (alreadyExist) {
      packageSelected = Object.keys(curr).reduce((carry, key) => {
        if (key === level1Key) {
          return carry
        }
        carry[key] = curr[key]
        return carry
      }, {})
    } else {
      packageSelected = { ...curr, ...level1 }
    }
    actionUpdatePackageSelected({ packageSelected })
  }

  togglePickUpLevel2 = (level1Key: string, level2: Object) => {
    let { packageSelected: curr = {}, actionUpdatePackageSelected } = this.props
    let currLevel1 = curr[level1Key] || {}
    // Check if level2 exist
    let level2Key = Object.keys(level2)[0]
    let alreadyExist = currLevel1[level2Key]

    let level1

    if (alreadyExist) {
      level1 = Object.keys(currLevel1).reduce((carry, key) => {
        if (key === level2Key) {
          return carry
        }

        carry[key] = currLevel1[key]
        return carry
      }, {})
    } else {
      level1 = { ...currLevel1, ...level2 }
    }

    let isLevel1Empty = Object.keys(level1).length === 0

    let packageSelected

    if (isLevel1Empty) {
      packageSelected = Object.keys(curr).reduce((carry, key) => {
        if (key === level1Key) {
          return carry
        }
        carry[key] = curr[key]
        return carry
      }, {})
    } else {
      packageSelected = { ...curr, ...{ [level1Key]: level1 } }
    }

    actionUpdatePackageSelected({ packageSelected })
  }

  toggleViewMode = () => {
    let { mode: currMode } = this.state
    let mode = currMode === "view" ? "edit" : "view"
    this.setState({ mode })
  }

  resetSelected = () => {
    let { actionUpdatePackageSelected } = this.props
    actionUpdatePackageSelected({})
  }

  updateCodeMirror = (newCode: string) => {
    let packageJson = newCode
    let { actionUpdatePackageJson } = this.props
    actionUpdatePackageJson({ packageJson })
  }

  testTypeCheck = () => {
    let { actionUpdatePackageSelected } = this.props
    actionUpdatePackageSelected({ packageSelected: null })
  }

  render() {
    let { packageJson } = this.props
    let { mode } = this.state
    let isViewMode = mode === "view"
    return (
      <div>
        <button onClick={this.toggleViewMode}>{"switch view"}</button>
        <button onClick={this.resetSelected}>{"reset selected"}</button>
        <button onClick={this.testTypeCheck}>{"test type check"}</button>
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
