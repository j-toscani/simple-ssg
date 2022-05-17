import fs from "fs/promises";
import path from "path";
import createDir from "../helper/createDir";
import { convertContent } from "./convertContent";
import { createPageFactory } from "./createPage";

export async function createOutFiles(
  inputFiles: string[],
  outFilePaths: string[]
) {
  const contents = await Promise.all(inputFiles.map(getContents));
  const attributes = contents.map(convertContent);
  const template = await getContents(path.resolve(__dirname, "../templates/default.html"))
  const createPage = createPageFactory(template);
  const pages = attributes.map(createPage);

  pages.forEach((page, index) => writePages(outFilePaths[index], page))
}

function getContents(filePath: string) {
  return fs.readFile(filePath, { encoding: "utf-8" });
}

function writePages(filePath: string, content: string) {
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
  return dirs
    .map((dir) => dir.replace(from, to))
    .map((path) => path.replace(".md", ".html"));
}
