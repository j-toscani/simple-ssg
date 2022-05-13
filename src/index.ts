import * as fs from "fs/promises";
import * as path from "path";
import { marked } from "marked";
import createDir from "./helper/createDir";

const getContentPath = (filename: string) =>
  path.join(__dirname, "../content/", filename);
const getOutputPath = (filename: string) =>
  path.join(__dirname, "../dist/", filename);

fs.readFile(getContentPath("content.md"), "utf-8").then(
  async (content: string) => {
    const markedContent = marked.parse(content);
    const dirPath = path.join(__dirname, "../dist/");

    try {
      await createDir(dirPath)
      fs.writeFile(getOutputPath("content.html"), markedContent);
    } catch (error) {
      console.log(error);
    }
  }
);
