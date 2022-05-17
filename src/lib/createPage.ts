import * as path from "path";
import fillTemplate from "./readTemplate";

export function createPageFactory(template: string) {
    return <T extends {body:string}>(content: T ) => {
        return fillTemplate(template, content);
    }
}