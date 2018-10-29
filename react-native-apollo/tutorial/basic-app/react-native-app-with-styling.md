# React Native Components with Styling

The UI for this app has already been done. In the upcoming sections, we will integrate this UI with the GraphQL backend. This section briefly describes the code structure of the app.

We have used a `react-navigation` for navigating between screens. The code structure for the screens is as follows:

- Switch Navigator (`src/navigation/AppNavigator`)
  - Auth Screen (`src/screens/AuthScreen.js`)
  - Drawer Navigator (`src/navigation/DrawerNavigator.js`)
    - Online Users Screen `src/screens/UsersScreen.js` 
    - Tab Navigator (`src/navigation/MainTabNavigator.js`)
      - Public Todos Screen: `src/screens/PublicTodosScreen.js`
      - Private Todos Screen: `src/screens/PrivateTodosScreen.js`
    - Logout screen (`src/screens/LogoutScreen.js`) 


- **Switch Navigator**: A switch navigator is a navigator used mainly for switching between two entirely different screens each with a different context. Our switch navigator broadly switches between `Auth Screen` and the main `App screen`. 

  The `App.js` present at the root level of the app renders this navigator.

- **Drawer Navigator**: [TODOImage] It is drawer used to switch between the screens of the app (todos, online users, logout).

- **Tab Navigator**: [TODOImage] This renders a tab for private todos and a tab for public todos.

