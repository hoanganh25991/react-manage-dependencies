const fs = require("fs")
const path = require("path")

const stateJsonFile = path.join(__dirname, "/../src/cache/state.json")

if (!fs.existsSync(stateJsonFile)) {
  fs.writeFileSync(stateJsonFile, "{}")
}
