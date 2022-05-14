import path from "path";
import {convertInputPathToOutputPath, createOutDirs, createOutFiles} from "./lib/createOutput";
import getContentPaths from "./lib/getContentPaths";

run();

async function run() {
  const from = path.resolve(__dirname, "../../content/");
  const to = path.resolve(__dirname, "../../dist/");

  const { files, directories } = await getContentPaths(from);
  
  const [outDirectories, outFilePaths] = [directories, files].map((paths) =>
    convertInputPathToOutputPath(paths, from, to)
  );
  
  await createOutDirs(outDirectories);
  createOutFiles(files, outFilePaths);
}