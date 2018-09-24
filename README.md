# Getting started

This is a simple demo app demonstrating how to build a todo app with react and apollo using Hasura's GraphQL APIs. The todo app will have the following features:

- Manage Private Todos
- View / Collaborate on Public Todos
- Display online members leveraging subscriptions

## Intro to GraphQL

GraphQL is a query language.

## Installation

Create React App Boilerplate
`npx create-react-app react-apollo-todo`

Styles
`npm install bootstrap react-bootstrap --save`

Routing
`npm install react-router react-router-dom --save`

Apollo Client Setup
`npm install apollo-client apollo-link-http apollo-link-context apollo-cache-inmemory react-apollo graphql-tag graphql --save`

Subscriptions Setup
`npm install --save apollo-link-ws subscriptions-transport-ws`
`npm install moment --save` // for date/time manipulation

Note: apollo-boost is a minimal config way to start using Apollo Client. It includes some sensible defaults, such as InMemoryCache and HttpLink. But it doesn't support subscriptions.

Auth0
`npm install auth0-js --save`
`npm install graphqurl --save`

Tooling
`npm install eslint eslint-plugin-react --save-dev`
`npm install -save-dev --save-exact prettier`
`npm install lint-staged husky --save-dev`
`prettier --single-quote --trailing-comma es5 --write "{src,__{tests,mocks}__}/**/*.js"`

  <insert-gif>

#### Directory Structure

    This is the typical directory structure of the app.

#### Frontend

    - React
    - Apollo Client

#### Backend

    - Hasura GraphQL Engine

## Why GraphQL Client?

- Manage queries and mutations without the complexity of a typical HTTP requests.
- Build time schema validation
- Optimise queries and caching

Two popular GraphQL clients - Apollo Client and Relay.

For simple use-cases, you can use `graphqurl` as a replacement to `fetch` library.

# Queries

## React UI Setup

## Making your first query - react-apollo query component. A simple fetch_todo query

## Query using filters / operators - fetch_todo_by_user / fetch_completed_todos

## Sort todos by time.

## Pagination - limit & offset (limit the no of todos per page)

## Relationships - fetch user info for a todo / fetch all todos by a user (object / array)

## Summary - final queries for different components.

# Mutation

## Making your first mutation - setup input box. react-apollo mutation component

## Mutation using variables.

Passing variables is important. Including when cache is updated.

## Update / Delete todos

# Subscriptions

## How does subscriptions work? websocket / apollo-subscriptions-transport-ws

A very common way of using refetchQueries is to import queries defined for other components to make sure that those components will be updated:

withApollo HOC

To update the client state after a mutation, we have three options:

Refetch queries that could be affected by the mutation
Manually update the client state based on the mutation result
Use GraphQL subscriptions to notify us about updates

Optimistic UI for smooth rendering without delay

## Public todos / Online member count

# Adding Authentication

## Integrate with Auth0 API

npm install --save graphqurl

Make a mutation query to store user's auth0 id into db
Initiate auth0 client with scope : openid profile (to get user's metadata)

## Login redirect logic and apply filters

After login, update last_seen for online users
Setup a subscription to update last_seen in the background

# Summary
