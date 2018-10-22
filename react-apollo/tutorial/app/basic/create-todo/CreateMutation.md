import { Mutation } from "react-apollo";

Now, lets wrap our React component with Apollo Mutation.

```

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

```



      <Mutation mutation={MUTATION_TODO_ADD}>
        {(addTodo, { error }) => {
          if (error) {
            alert("Something went wrong");
          }
          return (
            <div className="formInput">
              <input
                className="input"
                data-test={
                  this.props.type === "private"
                    ? "input-private"
                    : "input-public"
                }
                placeholder="What needs to be done?"
                value={this.state.textboxValue}
                onChange={this.handleTextboxValueChange.bind(this)}
                onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addTodo);
                }}
              />
              <i className="downArrow fa fa-angle-down" />
            </div>
          );
        }}
      </Mutation>
