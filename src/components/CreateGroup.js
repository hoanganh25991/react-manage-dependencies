import React from "react"
import * as t from "../styles"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

console.log(t)

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

  loadPickUp = packageJson => {
    let { packageSelected } = this.state
    try {
      let packageObj = JSON.parse(packageJson)
      let packageKeys = Object.keys(packageObj)

      return (
        <div style={{ ...t.height300, ...t.scrollY }}>
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

  updateCodeMirror = packageJson => {
    this.setState({ packageJson })
  }

  render() {
    let { groupName, packageJson } = this.state
    let options = {
      lineNumbers: true,
      mode: "javascript"
    }
    /// value mirror not update
    return (
      <div style={t.flexColumn}>
        <h1>Create group</h1>
        <h3>Group name</h3>
        <input type="text" value={groupName} onChange={this.setGroupName} />
        <h3>Load package.json</h3>
        <input type="file" onChange={this.readPackageJson} />
        <div style={{ ...t.flexRow }}>
          <div style={{ ...t.flex1, ...t.flexColumn }}>
            <CodeMirror value={packageJson} options={options} onChange={this.updateCodeMirror} />
          </div>
          <div style={{ ...t.flex1 }}>
            {this.loadPickUp(packageJson)}
          </div>
        </div>
      </div>
    )
  }
}
