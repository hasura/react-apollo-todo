Now that you have cloned the app, run the app to see if everything works as expected.

To get started, you will need to load the private todo data from the database. You will now define a graphql query to fetch the same.

```

query fetch_todos {
    todos(
      where: { is_public: { _eq: false } }
      order_by: created_at_desc
    ) {
      id
      text
      is_completed
      created_at
      is_public
     }
  }

```

[Try]() this query in GraphiQL against the application database to see what the response looks like. 

Note that, you need to pass the `Authorization: Bearer <token>` header before querying to get the results.