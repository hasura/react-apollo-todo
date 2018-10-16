import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { setContext } from "apollo-link-context";

import { getHeaders } from "./utils";
import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from "./constants";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth0:id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const token = localStorage.getItem("auth0:id_token");
// Create an http link:
const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch,
  headers: getHeaders(token)
});

// Create a WebSocket link:
const wsLink = new WebSocketLink(
  new SubscriptionClient(REALTIME_GRAPHQL_URL, {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: getHeaders(token)
    }
  })
);

// wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => wsLink.subscriptionClient.maxConnectTimeGenerator.max

// chose the link to use based on operation
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({
    addTypename: true
  })
});

const provideClient = component => {
  return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication(client);
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/"
          render={props =>
            provideClient(<App auth={auth} client={client} {...props} />)
          }
        />
        <Route
          path="/home"
          render={props =>
            provideClient(<Home auth={auth} client={client} {...props} />)
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
