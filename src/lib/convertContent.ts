import fm from "front-matter";
import { marked } from "marked";

export function convertContent(fileContent: string) {
    const fileProps = fm(fileContent);
    const content = marked.parse(fileProps.body);
    return {...fileProps, body: content};
}

export type ContentAttributes = ReturnType<typeof convertContent> & {[key: string]: any};