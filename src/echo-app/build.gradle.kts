
val npm = rootProject.extra.get("npm")
val npx = rootProject.extra.get("npx")

task<Exec>("npmInstall") {
    commandLine(npm, "install")
}

task<Exec>("npmClean") {
    commandLine(npx, "rimraf", "build/index.js")
}

task<Exec>("npmCleanModules") {
    commandLine(npx, "rimraf", "node_modules")
}

task<Exec>("npmBuild") {
    commandLine(npm, "run", "build")
    dependsOn(":src:echo-common:npmBuild")
}
