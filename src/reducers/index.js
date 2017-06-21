import * as c from "../actions/actionTypes"

const initalState = {
  groupName: "",
  packageJson: "",
  packageSelected: {},
  snippet: "",
  groups: []
}

const loadState = () => {
  let stateJson = localStorage.getItem(c.LOCAL_KEY)
  try {
    let state = JSON.parse(stateJson)
    let isEmpty = Object.keys(state).length === 0
    return isEmpty ? initalState : state
  } catch (err) {
    return initalState
  }
}

export default (state = initalState, action) => {
  switch (action.type) {
    case c.STORE_HISTORY: {
      let { history } = action
      return { ...state, history }
    }
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
    case c.UPDATE_GROUPS: {
      // Get out current group info
      let { groupName, packageSelected, snippet } = state
      let { groups: currGroups } = state

      let groups = [...currGroups, { groupName, packageSelected, snippet }]
      // Update exist groups
      // Reset for create new one
      return { ...state, groups }
    }

    case c.SAVE_TO_LOCAL: {
      // Store
      localStorage.setItem(c.LOCAL_KEY, JSON.stringify(state))
      return state
    }
    case c.GO_TO_HOME: {
      let { history } = state
      if (history) {
        history.push("/")
      }
      return state
    }
    default:
      return state
  }
}
