import { StackContext, Api, RDS} from "sst/constructs";

export function API({ stack }: StackContext) {
  const DATABASE = "TodoDB";


  const cluster = new RDS(stack, "Cluster", {
    engine: "postgresql10.14",
    defaultDatabaseName: DATABASE,
    migrations: "packages/migrations",
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [cluster],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "ANY /getUser": "packages/functions/src/trpc.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
    SecretArn: cluster.secretArn,
    ClusterIdentifier: cluster.clusterIdentifier,
  });
}
