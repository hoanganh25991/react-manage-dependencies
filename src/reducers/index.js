import * as c from "../actions/actionTypes"
import state from "../cache/state.json"

const initalState = {
  groupName: "",
  packageJson: "",
  packageSelected: {}
}

const loadState = () => {
  let isEmptyObj = Object.keys(state).length == 0
  return isEmptyObj ? initalState : state
}

export default (state = initalState, action) => {
  switch (action.type) {
    case c.LOAD_DATABASE: {
      console.log("load state")
      return loadState()
    }
    // Handle package json
    case c.UPDATE_PACKAGE_JSON: {
      let { packageJson } = action
      return { ...state, packageJson }
    }

    // Handle package selected
    case c.UPDATE_PACKAGE_SELECTED: {
      let { packageSelected } = action
      return { ...state, packageSelected }
    }

    // Handle group name
    case c.UPDATE_GROUP_NAME: {
      let { groupName } = action
      return { ...state, groupName }
    }

    // Handle snippet
    case c.UPDATE_SNIPPET: {
      let { snippet } = action
      return { ...state, snippet }
    }

    default:
      return state
  }
}
