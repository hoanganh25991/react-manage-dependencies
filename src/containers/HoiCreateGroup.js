import { connect } from "react-redux"
import CreateGroup from "../components/CreateGroup"
import { actionUpdatePackageJson, actionUpdateGroupName, actionUpdateSnippet, actionCreateGroup } from "../actions"
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
  actionUpdateGroupName: Function,
  actionUpdateSnippet: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionUpdatePackageJson: ({ packageJson }) => dispatch(actionUpdatePackageJson({ packageJson })),
  actionUpdateGroupName: ({ groupName }) => dispatch(actionUpdateGroupName({ groupName })),
  actionUpdateSnippet: ({ snippet }) => dispatch(actionUpdateSnippet({ snippet })),
  actionCreateGroup: () => dispatch(actionCreateGroup())
})

export default connect(mapStateToProps, mapActionToProps)(CreateGroup)
