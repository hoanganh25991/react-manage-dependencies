import React from "react"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: "//code"
    }
  }

  updateCode = newCode => {
    this.setState({
      code: newCode
    })
  }

  render() {
    let { code } = this.state
    let options = {
      lineNumbers: true,
      mode: "javascript"
    }
    return (
      <div>
        <CodeMirror value={code} onChange={this.updateCode} options={options} />
      </div>
    )
  }
}
