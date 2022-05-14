import fs from "fs/promises";
import path from "path";

const ignore = ["node_modules", ".git"];

export default async function getContentPaths(dir: string) {
  const directories = await getDirectories(dir);
  const files = await Promise.all([dir, ...directories].map((directory) => getFilePaths(directory)));
  return { files: files.flat(), directories };
}

async function getDirectories(baseDir: string, directories: string[] = []) {
  const dirs = await fs.readdir(baseDir, { withFileTypes: true });

  for (const data of dirs) {
    if(!data.isDirectory() || ignore.includes(data.name)) continue;

    const directory = path.resolve(baseDir, data.name);
    directories.push(directory);
    await getDirectories(directory, directories);
  }

  return directories;
}

async function getFilePaths(directoryPath: string, files: string[] = []) {
  const paths = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const filepath of paths) {
    if(filepath.isDirectory() || !filepath.name.endsWith(".md")) continue;
    files.push(path.resolve(directoryPath, filepath.name));
  }

  return files
}
