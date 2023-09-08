import { Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";


export class DataStack extends Stack {

    public readonly cypherTable: ITable

    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props);

        this.cypherTable = new Table(this, 'cypherTable', {
            partitionKey : {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `cypherTable`
        })
    }
}