
# App structure
App.js should have routes inside it. Structure should be as simple and modular and well named as possible.
index.js opens app.js like in create-react-app. Don't change that structure.

- Have one route for handling auth stuff and delegate that to auth0 component
- Have one route for home page
- If logged in -> home
- If not-logged in -> auth

# Setup and first steps
- npm start and check if app is working
- Exercise 1: Go to home page and show the auth0 token on the top banner
