* STEP 1: Set auth0 domain

  Set your auth0 domain in `auth-webhook/.env`.
  Also allow callbacks for `http://localhost:3000/callback` and any other deployed URL in your `auth0` dashboard.

* STEP 2: Deploy the auth Webhook (using ngrok, glitch, heroku etc)

  [![glitch-deploy-button](https://raw.githubusercontent.com/hasura/sample-auth-webhook/master/assets/deploy-glitch.png)](https://glitch.com/edit/#!/thundering-brick)

* STEP 3: Start GraphQL engine with the the auth-hook as the webhook URL and access key of your choice

  Deploy GraphQL engine to Heroku if you haven't already.

  [![Deploy to heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

* STEP 4: Apply the migrations

  - Add your database URL and access key in `hasura/config.yaml`
  - Run `hasura migrate apply` to create the required tables and permissions for the todo app

* Step 5: Set React app variables

  Set `auth0 domain`, `auth0 client ID` and the `GraphQL Engine URL` in `react-apollo-todo/src/constants.js`

* Step 6: Run the React app

  Run `npm start` from the `react-apollo-todo` directory to start the TODO app.
  > THe app runs on port 3000 by default. You can change the port number, but you will also have to reconfigure the callback
