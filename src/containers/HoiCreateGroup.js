import { connect } from "react-redux"
import CreateGroup from "../components/CreateGroup"
import { actionUpdatePackageJson, actionUpdateGroupName } from "../actions"
import { getPackageGroupName, getPackageJson } from "../selectors"

type PropsState = {
  groupName: String,
  packageJson: String
}

const mapStateToProps = (state): PropsState => {
  let groupName = getPackageGroupName(state)
  let packageJson = getPackageJson(state)
  return {
    groupName,
    packageJson
  }
}

type PropsAction = {
  actionUpdatePackageJson: Function,
  actionUpdateGroupName: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionUpdatePackageJson: ({ packageJson }) => dispatch(actionUpdatePackageJson({ packageJson })),
  actionUpdateGroupName: ({ groupName }) => dispatch(actionUpdateGroupName({ groupName }))
})

export default connect(mapStateToProps, mapActionToProps)(CreateGroup)
