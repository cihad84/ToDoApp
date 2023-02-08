import { StackContext, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "ANY /getUser": "packages/functions/src/trpc.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
