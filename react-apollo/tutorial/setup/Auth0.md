You will be making use of Auth0 for authentication in your react app.

## Set Environment variables

Open `.env` file that we created in the last step and add the following:

```
REACT_APP_CALLBACK_URL=http://localhost:3000/callback
REACT_APP_AUTH0_DOMAIN=todo-hasura-test.auth0.com
REACT_APP_AUTH0_CLIENT_ID=lgKxyHzCDUWCALdAOkjg3QI2D6eglGes
```

Here we set Auth0 configuration such as domain, client id and callback url.

Run the react app by executing:

```
$ npm start
```

The boilerplate UI should look something like this:

<insert image>

After logging in, it should look like this:

<insert image>

Still facing issues? Click here to debug common issues.

<insert-gif-setup>



