const express = require('express');
const { VoyagerServer } = require('@aerogear/voyager-server');
const http = require('http');

const schema = require('./schema').schema;

const PORT = 4000;

function start() {
  const app = express();

  const apolloServer = VoyagerServer({ schema });
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  apolloServer.applyMiddleware({ app });

  return new Promise(resolve => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`🚀  Server ready at http://localhost:${PORT}/graphql`);
      resolve(httpServer);
    });
  });
}

module.exports = start;