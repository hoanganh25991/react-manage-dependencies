import { connect } from "react-redux"
import App from "../components/App"
import { actionLoadDatabase } from "../actions"

const mapStateToProps = null

type PropsAction = {
  actionLoadDatabase: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionLoadDatabase: () => dispatch(actionLoadDatabase())
})

export default connect(mapStateToProps, mapActionToProps)(App)
