// @flow
import { connect } from "react-redux"
import React from "react"
import * as c from "../actions/actionTypes"

// Simple Debug panel
export class Debug extends React.PureComponent {
  clearLocalStorage = () => {
    localStorage.setItem(c.LOCAL_KEY, "")
  }

  render() {
    return (
      <div>
        <h3>Debug tool</h3>
        <div>
          <button title="clear localstorage" onClick={this.clearLocalStorage}>Clear</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = null
const mapActionToProps = dispatch => ({})

export default connect(mapStateToProps, mapActionToProps)(Debug)
