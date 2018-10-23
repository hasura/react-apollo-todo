Apollo Client Setup

```
$ npm install apollo-boost
```

`apollo-boost` comes bundled with several most used packages that you need to with Apollo Client. Here they are:

`apollo-client`: the client that can be used with any javascript front-end.
`apollo-cache-inmemory`: recommended cache implementation for Apollo Client 2.0.
`apollo-link-http`: An Apollo Link for modifying control flow of GraphQL requests.  
`apollo-link-error`: An Apollo Link for handling and inspecting errors.
`apollo-link-state`: An Apollo Link for managing local data.
`graphql-tag`: Utitily for parsing GraphQL queries. 

Note: apollo-boost is a minimal config way to start using Apollo Client. It includes some sensible defaults.

Apart from `apollo-boost`, you also need to install `react-apollo` and `graphql` packages.

```

$ npm install react-apollo graphql

```

`react-apollo` has the necessary bindings to use Apollo Client with React.

