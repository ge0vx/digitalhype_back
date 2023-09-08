import { CypherEntry } from "../model/Model"

export class MissingFieldError extends Error {
    constructor(missingField: string){
        super(`Value for ${missingField} is required!`)
    }
}

export function validateCypherEntry(arg: any){
    if((arg as CypherEntry).cypher == undefined){
        throw new MissingFieldError('cypher')
    }
}