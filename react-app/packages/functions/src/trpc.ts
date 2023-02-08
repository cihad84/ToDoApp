import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';



export const handler = awsLambdaRequestHandler({
  router: appRouter,
})