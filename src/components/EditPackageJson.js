import React from "react"
import * as t from "../styles"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

export default class EditPackageJson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      packageSelected: {},
      mode: "view"
    }
  }

  loadPickUp = packageJson => {
    let { packageSelected } = this.state
    try {
      let packageObj = JSON.parse(packageJson)
      let packageKeys = Object.keys(packageObj)

      return (
        <div style={{ ...t.height300, ...t.scrollY, ...t.widthFull }}>
          {packageKeys.map(key => {
            let val = packageObj[key]
            let isStr = typeof val === "string"
            let chosen = Boolean(packageSelected[key])
            if (isStr) {
              return (
                <div {...{ key }}>
                  <input type="checkbox" checked={chosen} onClick={this.togglePickUp({ [key]: packageObj[key] })} />
                  <b>{key}</b> {val}
                </div>
              )
            }

            return (
              <div {...{ key }}>
                <div>
                  <input type="checkbox" checked={chosen} onClick={this.togglePickUp({ [key]: packageObj[key] })} />
                  <b>{key}</b>
                </div>
                <ul>
                  {Object.keys(val).map(valKey => {
                    let chosen = Boolean(packageSelected[key] && packageSelected[key][valKey])
                    return (
                      <div {...{ key: valKey }}>
                        <input
                          type="checkbox"
                          checked={chosen}
                          onClick={this.togglePickUp({ [key]: { [valKey]: packageObj[key][valKey] } }, key)}
                        />
                        <b>{valKey}</b> {val[valKey]}
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

  togglePickUp = (obj, key) => () => {
    let { packageSelected: curr } = this.state
    if (key) {
      let newDeepObj = obj[key]
      let currDeepObj = curr[key]
      let deepObj = { ...currDeepObj, ...newDeepObj }
      obj = { [key]: deepObj }
    }
    let packageSelected = { ...curr, ...obj }
    console.log(packageSelected)
    this.setState({ packageSelected })
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
