import * as path from "path"; 
import * as fs from "fs/promises";

export default async function createDir(dirPath: string) {
    const resolvedDirPath = isAbsolutePath(dirPath) ? dirPath: path.resolve(__dirname, dirPath);

    try {
        await fs.readdir(resolvedDirPath);
    } catch (error) {
        await fs.mkdir(resolvedDirPath, {recursive:true});
    }
}

function isAbsolutePath(path: string) {
    return path.startsWith("/");
}