import express from "express";
import * as dotenv from "dotenv";
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { graphqlHTTP } from "express-graphql";

dotenv.config();
const app = express();
// app.use = express();

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
  }),
});

//graphql variables
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        args.id = args.id + 1;
        return [{id:args.id}];
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    decreaseID: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return args.id - 1;
      },
    },
  },
});

//schema obj
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

//graphQl route
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


// Define Routes Here
const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
