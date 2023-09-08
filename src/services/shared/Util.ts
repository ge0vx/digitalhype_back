import { CypherEntry } from "../model/Model";

export function isNum(val: string): boolean{
    return /^\d+$/.test(val);
}

export function decryptCypher(arg: any): string[]{
    return (arg as CypherEntry).cypher.replace(/([0])+/g, " ").split(" ").filter((i: string)=> i !== "");
}