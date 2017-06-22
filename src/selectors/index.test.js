import * as selectors from "./index"

const funcNames = ["getPackageJson", "getPackageSelected", "getPackageGroupName"]

it("sums numbers", () => {
  funcNames.forEach(funcName => {
    expect(typeof selectors[funcName]).toEqual("function")
  })
})

// code coverage test on code written
// was it look good in some points duplication, deep scope, ...
