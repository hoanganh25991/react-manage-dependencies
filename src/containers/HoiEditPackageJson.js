import { connect } from "react-redux"
import EditPackageJson from "../components/EditPackageJson"
import { actionUpdatePackageJson } from "../actions"

const mapStateToProps = null
const mapActionToProps = dispatch => ({
  actionUpdatePackageJson: ({ packageJson }) => dispatch(actionUpdatePackageJson({ packageJson }))
})

export default connect(mapStateToProps, mapActionToProps)(EditPackageJson)
