import * as c from "../actions/actionTypes"
import state from "../cache/state.json"

const initalState = {}

const loadState = () => {
  // Find state json file in cache
  //   let state = JSON.parse(state);
  //   return state;
  return state
}

export default (state = initalState, action) => {
  switch (action.type) {
    case c.LOAD_DATABASE: {
      console.log("load state")
      return loadState()
    }
    case c.IMPORT_PACKAGE_JSON: {
      let { packageJson } = action
      return { ...state, packageJson }
    }
    case c.UPDATE_PACKAGE_JSON: {
      let { packageJson } = action
      return { ...state, packageJson }
    }
    default:
      return state
  }
}
