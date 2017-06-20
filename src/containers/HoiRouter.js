// @flow
import { connect } from "react-redux"
import React from "react"
import createHistory from "history/createBrowserHistory"
import { Router } from "react-router"
import { actionStorHistory } from "../actions"

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  history = createHistory(this.props)

  componentDidMount() {
    let { actionStoreHistory } = this.props
    let { history } = this
    actionStoreHistory({ history })
  }

  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}

const mapStateToProps = null

type PropsAction = {
  actionStoreHistory: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionStoreHistory: ({ history }) => dispatch(actionStorHistory({ history }))
})

export default connect(mapStateToProps, mapActionToProps)(BrowserRouter)
