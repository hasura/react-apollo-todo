# Getting started

This is an in-depth tutorial demonstrating how to build a todo app with react and apollo using Hasura's GraphQL APIs. The todo app will have the following features:

- Manage Personal Todos
- Collaborate on Public Todos
- Display online members using subscriptions
- Uses Hasura GraphQL Engine Public API

## Intro to GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## Installation

Create React App Boilerplate
`$ npx create-react-app react-apollo-todo`

Styles
`$ npm install bootstrap react-bootstrap --save`

Routing
`$ npm install react-router react-router-dom --save`

Apollo Client Setup
`$ npm install apollo-client apollo-link-http apollo-link-context apollo-cache-inmemory react-apollo graphql-tag graphql --save`

Note: apollo-boost is a minimal config way to start using Apollo Client. It includes some sensible defaults, such as InMemoryCache and HttpLink. But it doesn't support subscriptions and hence we install all Apollo dependencies directly.

Subscriptions Setup
`$ npm install --save apollo-link-ws subscriptions-transport-ws`
`$ npm install moment --save` // for date/time manipulation

Auth0 Authentication
`$ npm install auth0-js --save`
`$ npm install graphqurl --save`

Tooling (ESLint, PropTypes, Prettier)
`$ npm install eslint eslint-plugin-react -g` // global setup
`$ npm install --save prop-types`
`$ npm install -save-dev --save-exact prettier eslint-plugin-prettier`
`$ npm install lint-staged husky --save-dev`
`$ prettier --single-quote --trailing-comma es5 --write "{src,__{tests,mocks}__}/**/*.js"`

  <insert-gif>

#### Directory Structure

    This is the typical directory structure of the app.

#### Frontend

    - React
    - Apollo Client

#### Backend

    - Hasura GraphQL Engine
    - Auth0

## Why GraphQL Client?

- Manage queries and mutations without the complexity of a typical HTTP requests.
- Build time schema validation
- Optimise queries and caching

Two popular GraphQL clients - Apollo Client and Relay.

Why Apollo Client?

<Comparison>

For simple use-cases, you can use `graphqurl` as a replacement to `fetch` library.

# Queries

## React UI Setup

## Making your first query - react-apollo query component. A simple fetch_todo query

Making use of GraphiQL

Public Todos

## Query using filters / operators - fetch_todo_by_user / fetch_completed_todos

Personal Todos by userId

## Sort todos by time.

## Pagination - limit & offset (limit the no of todos per page)

Todo

## Relationships - fetch user info for a todo / fetch all todos by a user (object / array)

Todo

## Patterns

A very common way of using refetchQueries is to import queries defined for other components to make sure that those components will be updated:

withApollo HOC

To update the client state after a mutation, we have three options:

Refetch queries that could be affected by the mutation
Manually update the client state based on the mutation result
Use GraphQL subscriptions to notify us about updates

## Summary - final queries for different components.

React code snippet

# Mutation

Optimistic UI for smooth rendering without delay (todo)

## Making your first mutation - setup input box. react-apollo mutation component

## Mutation using variables.

Passing variables is important. Wherever cache is updated, variables need to be passed there as well.

## Update / Delete todos

Update is_completed for todo using mutation.

Delete todo on X click.

# Subscriptions

## How does subscriptions work? websocket / apollo-subscriptions-transport-ws

Note: Subscriptions will only listen for new changes

## Public todos / Online member count

Subscription to `online_users` and get the name.

# Adding Authentication

## Integrate with Auth0 API

`$ npm install --save graphqurl`

Make a mutation query to store user's auth0 id into db
Initiate auth0 client with scope : openid profile (to get user's metadata)

## Login redirect logic and apply filters

After login, start polling update on `last_seen` column for online users

# Summary
