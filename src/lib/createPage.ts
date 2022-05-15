import { ContentAttributes } from "./convertContent";

export function createPage(content: ContentAttributes) {
    return content.body;
}