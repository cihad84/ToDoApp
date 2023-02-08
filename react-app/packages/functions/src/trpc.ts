
import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "@serverless-stack/node/rds";


interface Database {
  todos: {
    id: number;
    task: string;
    completed: boolean;
  };
}

const db = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: RDS.Cluster.defaultDatabaseName,
      secretArn: RDS.Cluster.secretArn,
      resourceArn: RDS.Cluster.clusterArn,
      client: new RDSDataService(),
    },
  }),
});

async function grabdata() {
  const record = await db
    .selectFrom("todos")
    .select("id")
    .executeTakeFirstOrThrow();

  let count = record.id;

  return {
    statusCode: 200,
    body: count,
  };
}


import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    const result = grabdata();
    req.input; // string
    return result;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';



export const handler = awsLambdaRequestHandler({
  router: appRouter,
})
