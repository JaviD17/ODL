import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema";
import { context } from "./context";

export const server = createServer({ schema, context });