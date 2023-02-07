const express = require("express");
const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const Schema = require("./schema");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: Schema,
  })
);

app.listen(5000, () => console.log("server on port 5000"));
