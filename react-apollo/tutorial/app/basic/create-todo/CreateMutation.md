So let's define the graphql mutation to be used.

Open `src/Todo/TodoQueries.js` and add the following code:

```
const MUTATION_TODO_ADD = gql`
  mutation insert_todos($objects: [todos_insert_input!]) {
    insert_todos(objects: $objects) {
      affected_rows
      returning {
        id
        text
        is_completed
        created_at
        is_public
      }
    }
  }
`;
export { 
  MUTATION_TODO_ADD
};
```

What does this mutation do?
---------------------------
The mutation inserts into `todos` table with the $objects variable being passed as one todo type.

Open `src/Todo/TodoInput.js` and add the following code below the other imports:

```
import { Mutation } from "react-apollo";
import {
  MUTATION_TODO_ADD
} from "./TodoQueries";

```

We are importing the `Mutation` component from `react-apollo` and the graphql query we defined above to fetch the todo data.

Now, we will wrap the component with `Mutation` passing our graphql mutation constant that we imported. Replace the `return` with the following code:

```
  <Mutation mutation={MUTATION_TODO_ADD}>
    {(addTodo, { error }) => {
      if (error) {
        alert("Something went wrong");
      }
      return (
        // paste your original return of this component.
      );
    }}
  </Mutation>
```

We need to handle the keypress event so that when user enters the todo, we capture that event and make a mutation. In the input element, attach the `onKeyPress` event handler. 

```
    <input
      ...
      ...
      onKeyPress={e => {
        this.handleTextboxKeyPress(e, addTodo);
      }}
    />
```

In the constructor, add the binding for the method as following:

```
  this.handleTextboxKeyPress = this.handleTextboxKeyPress.bind(this);
```

This is to get the context of `this` inside the method.

Now update the imports as follows:

```
import {
  QUERY_PRIVATE_TODO,
  QUERY_PUBLIC_TODO,
  MUTATION_TODO_ADD
} from "./TodoQueries";
```

Now add the method definition code:

```
  handleTextboxKeyPress(e, addTodo) {
    if (e.key === "Enter") {
      const newTodo = this.state.textboxValue;
      const userId = this.props.userId;
      const isPublic = this.props.type === "public" ? true : false;
      addTodo({
        variables: {
          objects: [
            {
              text: newTodo,
              user_id: userId,
              is_completed: false,
              is_public: isPublic
            }
          ]
        },
        update: (store, { data: { insert_todos } }) => {
          const query =
            this.props.type === "private"
              ? QUERY_PRIVATE_TODO
              : ''; // we'll update this later
          try {
            if (this.props.type === "private") {
              const data = store.readQuery({
                query: query,
                variables: { userId: this.props.userId }
              });
              const insertedTodo = insert_todos.returning;
              data.todos.splice(0, 0, insertedTodo[0]);
              store.writeQuery({
                query: query,
                variables: {
                  userId: this.props.userId
                },
                data
              });
            }
          } catch (e) {
            console.error(e);
          }
          this.setState({
            ...this.state,
            textboxValue: ""
          });
        }
      });
    }
  }
```

