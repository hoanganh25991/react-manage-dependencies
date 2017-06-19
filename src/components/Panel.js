import React, { PureComponent } from "react"
import JSONTree from "react-json-tree"
import JSONTree2 from "react-json-inspector"

// or use the shorthand
import Inspector, { ObjectInspector, TableInspector } from "react-inspector"

import { ObjectLabel } from "react-inspector"
import { ObjectRootLabel } from "react-inspector"

console.log(ObjectLabel, ObjectRootLabel)

const MyComponent = ({ data }) =>
  <div>
    <Inspector data={data} />
    {/* <Inspector table data={data} /> */}
  </div>

export default class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  loadDatabase = () => {
    let { actionLoadDatabase } = this.props
    actionLoadDatabase()
  }

  importPackageJson = () => {
    let { actionImportPackageJson } = this.props
    actionImportPackageJson()
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
          let packageObj = JSON.parse(packageJson)
          // Delete unused
          //['name', 'version', 'private'].forEach(key => delete packageObj[key])
          this.setState({ packageObj })
        } catch (err) {
          console.log(err)
        }
      })
    }
  }

  render() {
    let { packageObj } = this.state
    return (
      <div>
        <button onClick={this.loadDatabase}>load database</button>
        <label>import package.json</label>
        <input type="file" onClick={this.importPackageJson} onChange={this.readPackageJson} />
        {packageObj
          ? <div>
              {/* <JSONTree {...{data:packageObj}} /> */}
              {/* <JSONTree2 {...{data:packageObj}} /> */}
              <MyComponent {...{ data: packageObj }} />
            </div>
          : null}
        {packageObj
          ? <div>
              {Object.keys(packageObj).map(key =>
                <div {...{ key }}>
                  <h1>{key}</h1>
                  <ul>
                    {}
                  </ul>
                </div>
              )}
            </div>
          : null}
      </div>
    )
  }
}
