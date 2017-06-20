import { connect } from "react-redux"
import App from "../components/App"
import { actionLoadDatabase } from "../actions"

const mapStateToProps = null
const mapActionToProps = dispatch => ({
  actionLoadDatabase: () => dispatch(actionLoadDatabase())
})

export default connect(mapStateToProps, mapActionToProps)(App)
