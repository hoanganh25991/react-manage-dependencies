// @flow
import { connect } from "react-redux"
import EditPackageJson from "../components/EditPackageJson"
import { actionUpdatePackageJson, actionUpdatePackageSelected } from "../actions"
import { getPackageJson, getPackageSelected } from "../selectors"

// Define state truyen vao phai co packageJson
//
//
type PropsState = {
  packageJson: any,
  packageSelected: any
}

const mapStateToProps = (state): PropsState => {
  let packageJson = getPackageJson(state)
  let packageSelected = getPackageSelected(state)
  return {
    packageJson,
    packageSelected
  }
}

// O day nen co type check
// Nhu vay minh co the kiem soat la
// cai gi map vao thang HoiEditPackageJson phai co nhu vay
// neu khong thu khong cho
type PropsAction = {
  actionUpdatePackageJson: Function,
  actionUpdatePackageSelected: Function
}

const mapActionToProps = (dispatch): PropsAction => ({
  actionUpdatePackageJson: ({ packageJson }) => dispatch(actionUpdatePackageJson({ packageJson })),
  actionUpdatePackageSelected: ({ packageSelected }) => dispatch(actionUpdatePackageSelected({ packageSelected }))
})

export default connect(mapStateToProps, mapActionToProps)(EditPackageJson)
