import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import { Mutation } from './queries/Mutation'
import { Query } from './queries'
import { Subscription } from './subscriptions'
import { CV } from './queries/CV'
import { Skill } from './queries/SKILLS'
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname,"schemas/schema.graphql"),"utf-8"),
  resolvers: {
    Skill,
    CV,
    Query,
    Mutation,
    Subscription

  }
})