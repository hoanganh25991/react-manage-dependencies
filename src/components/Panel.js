import React, { PureComponent } from "react"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

export default class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
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
          // Update packageJson to state
          let { actionImportPackageJson } = this.props
          actionImportPackageJson({ packageJson })
          // Delete unused
          this.setState({ packageObj, packageJson })
        } catch (err) {
          console.log(err)
        }
      })
    }
  }

  loadFromSub = data => {
    let isObj = typeof data === "object"
    let hasProps = isObj && Object.keys(data).length > 0
    let isStr = typeof data == "string"

    if (isStr) {
      return <span>{data}</span>
    }

    return (
      <div>
        {isObj && hasProps
          ? Object.keys(data).map(key =>
              <div style={{ paddingLeft: 40 }} {...{ key }}>
                <input type="checkbox" {...{ key }} />
                <span><b>{key}</b> {data[key]}</span>
              </div>
            )
          : null}
      </div>
    )
  }

  render() {
    let { packageObj, packageJson } = this.state
    let options = {
      lineNumbers: true,
      mode: "javascript"
    }
    return (
      <div>
        <label>import package.json</label>
        <input type="file" onChange={this.readPackageJson} />
        {packageObj
          ? <div>
              {Object.keys(packageObj).map(key =>
                <div {...{ key }}>
                  <span><input type="checkbox" /><b>{key}</b> </span>
                  {this.loadFromSub(packageObj[key])}
                </div>
              )}
            </div>
          : null}
        {packageObj
          ? <div>
              <CodeMirror value={packageJson} options={options} />
            </div>
          : null}
      </div>
    )
  }
}
