import { CypherEntry } from "../model/Model"
import { decryptCypher, isNum } from "./Util";

export interface ValidCypher {
    first_name: string,
    last_name: string,
    id: string
}
export class MissingFieldError extends Error {
    constructor(missingField: string){
        super(`Value for ${missingField} is required!`)
    }
}

export class CypherFieldError extends Error {
    constructor(missingField: string, errorMessage: string){
        super(`Invalid ${missingField}, ${errorMessage}`)
    }
}

export function validateCypherEntry(arg: any): ValidCypher{
    const cypherEntry = (arg as CypherEntry).cypher;
    if(cypherEntry == undefined){
        throw new MissingFieldError('cypher')
    }

    const words = decryptCypher(arg);

    if(words.length < 3) {
        throw new CypherFieldError(cypherEntry,'the enconded string contains less than three phrases, please review it')
    }

    if(words.length > 3) {
        throw new CypherFieldError(cypherEntry, 'the enconded string contains more than three phrases, please review it')
    }

    if(isNum(words[0]) || isNum(words[1])){
        throw new CypherFieldError(cypherEntry, 'first and second phrases cannot contains numbers')
    }
    
    if(!isNum(words[2])){
        throw new CypherFieldError(cypherEntry, 'third phrase must contain only numbers')
    }

    return { 
        first_name: words[0], 
        last_name: words[1], 
        id: words[2] 
    }
}