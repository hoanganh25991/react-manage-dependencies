// @flow
import React from "react"
import { connect } from "react-redux"
import { Router } from "react-router"
import createHistory from "history/createBrowserHistory"
import { actionStorHistory } from "../actions"

/**
 * Self implement BrowserRoute
 * Store history then share it with state
 */
class BrowserRouter extends React.Component {
  history = createHistory(this.props)

  componentDidMount() {
    let { history } = this
    let { actionStoreHistory } = this.props
    actionStoreHistory({ history })
  }

  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}

/**
 * Container Component
 */
const mapStateToProps = null

type PropsAction = {
  actionStoreHistory: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionStoreHistory: ({ history }) => dispatch(actionStorHistory({ history }))
})

export default connect(mapStateToProps, mapActionToProps)(BrowserRouter)
