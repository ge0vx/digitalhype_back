import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";

const app = new App();
const dataStack = new DataStack(app, 'DataStack');
