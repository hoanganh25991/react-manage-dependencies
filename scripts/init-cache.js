const fs = require("fs")
try {
  let stateJson = fs.readdirSync(__dirname + "/../src/cache/state.json")
} catch (err) {
  console.log(err)
  if (err.code == "ENOENT") {
    fs.writeFileSync(__dirname + "/../src/cache/state.json", "{}")
  }
}
