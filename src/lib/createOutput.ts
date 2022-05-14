import fs from "fs/promises";
import { marked } from "marked";
import createDir from "../helper/createDir";

export async function createOutFiles(inputFiles: string[], outFilePaths: string[]) { 
    const contents = await Promise.all(inputFiles.map(getContents));
    const convertedContents = contents.map(convertContent);
    convertedContents.forEach((content, index) => writeContent(outFilePaths[index].replace(".md", ".html"), content))
}

function getContents(filePath: string) {
    return fs.readFile(filePath, {encoding: "utf-8"});
}

function convertContent(content: string) {
    return marked.parse(content);
}

function writeContent(filePath: string, content: string) {
    return fs.writeFile(filePath, content);
}

export function createOutDirs(dirs: string[]) {
    return Promise.all(dirs.map((dir) => createDir(dir)));
}

export function convertInputPathToOutputPath(
  dirs: string[],
  from: string,
  to: string
) {
  return dirs.map((dir) => dir.replace(from, to));
}
