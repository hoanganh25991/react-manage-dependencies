import React, { PureComponent } from "react"

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
          this.setState({ packageObj })
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
    let { packageObj } = this.state
    return (
      <div>
        <button onClick={this.loadDatabase}>load database</button>
        <label>import package.json</label>
        <input type="file" onClick={this.importPackageJson} onChange={this.readPackageJson} />
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
      </div>
    )
  }
}
