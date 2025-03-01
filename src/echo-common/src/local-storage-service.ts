import path from "path";
import * as os from "os";
import * as fs from "fs";

export class LocalStorageService {
    homeDirPath = path.resolve(os.homedir(), "poestack-sage")

    constructor() {
        if (!fs.existsSync(this.homeDirPath)) {
            fs.mkdirSync(this.homeDirPath)
        }
    }

    public existsJson(...jsonPath: string[]): boolean {
        return fs.existsSync(path.resolve(this.homeDirPath, ...jsonPath) + ".json")
    }

    public loadJson<T>(...jsonPath: string[]): T | null {
        const resolvedPath = path.resolve(this.homeDirPath, ...jsonPath) + ".json"
        try {
            return JSON.parse(fs.readFileSync(resolvedPath).toString())
        } catch (e) {
            console.log(e)
        }
        return null
    }

    public writeJson(jsonPath: string[], value: any) {
        const resolvedPath = path.resolve(this.homeDirPath, ...jsonPath)
        fs.mkdirSync(path.dirname(resolvedPath), {recursive: true});
        fs.writeFileSync(resolvedPath + ".json", JSON.stringify(value))
    }
}

export const LOCAL_STORAGE = new LocalStorageService()