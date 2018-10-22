
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
