import { APIGatewayProxyResult } from "aws-lambda";
import { CypherEntry } from "../model/Model";

export function isNum(val: string): boolean{
    return /^\d+$/.test(val);
}

export function decryptCypher(arg: any): string[]{
    return (arg as CypherEntry).cypher.replace(/([0])+/g, " ").split(" ").filter((i: string)=> i !== "");
}

export function addCorsHeader(arg: APIGatewayProxyResult){
    if(!arg.headers) {
        arg.headers = {}
    }
    arg.headers['Access-Control-Allow-Origin'] = "*";
    arg.headers['Access-Control-Allow-Methods'] = "*";
}