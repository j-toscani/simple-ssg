import fm from "front-matter";
import { marked } from "marked";

export function convertContent<T>(fileContent: string) {
    const fileProps = fm<T>(fileContent);
    const content = marked.parse(fileProps.body);
    return {...fileProps, body: content};
}