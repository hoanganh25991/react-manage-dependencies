import { connect } from "react-redux"
import Panel from "../components/Panel"
import { actionLoadDatabase } from "../actions"

const mapStateToProps = null
const mapActionToProps = dispatch => ({
  actionLoadDatabase: () => dispatch(actionLoadDatabase())
})

export default connect(mapStateToProps, mapActionToProps)(Panel)
