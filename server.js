import express from 'express';
import graphQLHTTP from 'express-graphql';
// import path from 'path';
// import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
import {schema} from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8088;


// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema, pretty: true, graphiql: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
