import React from "react";
import { Mutation } from "react-apollo";
import "../App.css";

import {
  QUERY_PRIVATE_TODO,
  QUERY_PUBLIC_TODO,
  MUTATION_TODO_ADD
} from "./TodoQueries";

class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      textboxValue: ""
    };
  }

  handleTextboxValueChange = e => {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  };

  handleTextboxKeyPress = (e, addTodo) => {
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
              : QUERY_PUBLIC_TODO;
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
  };

  render() {
    return (
      <Mutation mutation={MUTATION_TODO_ADD}>
        {(addTodo, { data, loading, called, error }) => {
          if (error) {
            alert("Something went wrong");
          }
          return (
            <div className="formInput">
              <input
                className="input"
                placeholder="What needs to be done?"
                value={this.state.textboxValue}
                onChange={this.handleTextboxValueChange}
                onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addTodo);
                }}
              />
              <i className="downArrow fa fa-angle-down" />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default TodoInput;
