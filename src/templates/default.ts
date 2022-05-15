import * as fs from "fs/promises";
import * as path from "path";
import { ContentAttributes } from "../lib/convertContent";

export default async function defaultTemplate(attributes: ContentAttributes) {
    let template = await getTemplate();
    const regex = new RegExp(/{{(.*)}}/gm);
    const keys = getKeys(template.matchAll(regex));
    keys.forEach(key => {template = template.replace(`{{ ${key} }}`, attributes[key] ?? '')});

    return template
}

function getTemplate() {
    return fs.readFile(path.resolve(__dirname, "./default.html"), {encoding: "utf-8"});
}

function getKeys(matches: IterableIterator<RegExpMatchArray>) {
    const keys: string[] = []
    for (const match of matches) {
        keys.push(match[1].trim())
    }
    return keys
}