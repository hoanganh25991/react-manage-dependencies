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
      return loadState()
    }
    default:
      return state
  }
}
