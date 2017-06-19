import { connect } from "react-redux"
import Panel from "../components/Panel"
import { actionLoadDatabase, actionImportPackageJson } from "../actions"

const mapStateToProps = null
const mapActionToProps = dispatch => ({
  actionLoadDatabase: () => dispatch(actionLoadDatabase()),
  actionImportPackageJson: () => dispatch(actionImportPackageJson())
})

export default connect(mapStateToProps, mapActionToProps)(Panel)
