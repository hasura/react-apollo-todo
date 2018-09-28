import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from "./constants";

const makeHttpAndWsLink = (uri, headers) => {

  // Create an http link:
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    fetch,
    headers
  });


  // Create a WebSocket link:
  const wsLink = new WebSocketLink(new SubscriptionClient(
    uri,
    {
      reconnect: true,
      connectionParams: {
        headers
      }
    },
  ));

  // chose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );


  return link;
};
const token = localStorage.getItem("auth0:access_token");
// return the headers to the context so httpLink can read them
const finalHeaders = {
  authorization: token ? `Bearer ${token}` : ""
};

const link = makeHttpAndWsLink(REALTIME_GRAPHQL_URL, finalHeaders);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const provideClient = component => {
  return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/"
          render={props => provideClient(<App auth={auth} {...props} />)}
        />
        <Route
          path="/home"
          render={props => provideClient(<Home auth={auth} {...props} />)}
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

export { client };
