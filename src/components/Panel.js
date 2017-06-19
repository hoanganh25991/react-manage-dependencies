import React, { PureComponent } from "react"

export default class Panel extends PureComponent {
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
      let fr = new FileReader()
      fr.onload = text => console.log(text, text.target.result)
      console.log(fr.readAsText(file))
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.loadDatabase}>load database</button>
        <label>import package.json</label>
        <input type="file" onClick={this.importPackageJson} onChange={this.readPackageJson} />
      </div>
    )
  }
}
