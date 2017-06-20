import * as c from "./actionTypes"
export const actionLoadDatabase = () => ({ type: c.LOAD_DATABASE })

export const actionUpdatePackageJson = ({ packageJson }) => ({ type: c.UPDATE_PACKAGE_JSON, packageJson })

export const actionUpdatePackageSelected = ({ packageSelected }) => ({
  type: c.UPDATE_PACKAGE_SELECTED,
  packageSelected
})

export const actionUpdateGroupName = ({ groupName }) => ({ type: c.UPDATE_GROUP_NAME, groupName })

export const actionUpdateSnippet = ({ snippet }) => ({ type: c.UPDATE_SNIPPET, snippet })

export const actionCreateGroup = () => ({ type: c.CREATE_GROUP })
