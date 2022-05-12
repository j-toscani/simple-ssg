import fs from "fs/promises";
import path from "path";

fs.readFile(path.join(__dirname, "../content/content.md")).then((content) => {
    console.log(content.toString());
});