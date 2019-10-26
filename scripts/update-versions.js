const package = require(__dirname + "/../package.json"),
    fs = require("fs")

const deps = [
    '@micro-frontends/core',
    '@micro-frontends/framework',
    '@micro-frontends/scripts',
    '@micro-frontends/config'
]
deps.forEach(dep => {
    const version = "^" + require(__dirname + "/../node_modules/" + dep + "/package.json").version
    if (package.devDependencies[dep]) {
        package.devDependencies[dep] = version
    } else {
        package.dependencies[dep] = version
    }
})
fs.writeFileSync("./package.json", JSON.stringify(package))