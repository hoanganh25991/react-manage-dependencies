import * as c from "./actionTypes"
export const actionLoadDatabase = () => ({ type: c.LOAD_DATABASE })
export const actionImportPackageJson = ({ packageJson }) => ({ type: c.IMPORT_PACKAGE_JSON, packageJson })
export const actionUpdatePackageJson = ({ packageJson }) => ({ type: c.UPDATE_PACKAGE_JSON, packageJson })
