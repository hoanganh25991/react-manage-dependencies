import fs from "fs"
import path from "path"

const stateJsonFile = path.join(__dirname, "/../src/cache/state.json")

if (!fs.existsSync(stateJsonFile)) {
  fs.writeFileSync(stateJsonFile, "{}")
}
