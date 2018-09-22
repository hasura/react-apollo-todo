import React from 'react';
import { Mutation } from "react-apollo";
import '../App.css';

import {
  QUERY_PRIVATE_TODO,
  MUTATION_TODO_ADD
} from './TodoQueries';

export default class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {
      textboxValue: ''
    }
  }

  handleTextboxValueChange = (e) => {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  }

  handleTextboxKeyPress = (e, addTodo) => {
    if (e.key === 'Enter') {
      const newTodo = this.state.textboxValue;
      const userId = this.props.userId;
      addTodo({
        variables: {
          objects: [{
            text: newTodo,
            user_id: userId,
            is_completed: false,
            is_public: false
          }]
        },
        update: (store, { data: { insert_todos }}) => {
          const data = store.readQuery({ query: QUERY_PRIVATE_TODO })
          const insertedTodo = insert_todos.returning;
          data.todos.splice(0, 0, insertedTodo[0])
          store.writeQuery({
            query: QUERY_PRIVATE_TODO,
            data
          })
          this.setState({
            ...this.state,
            textboxValue: ''
          });
        }
      })
    }
  }

  render() {
    return (
      <Mutation mutation={MUTATION_TODO_ADD}>
        {(addTodo, { data, loading, called, error }) => {
          if (error) {
            alert("Something went wrong");
          }
          return (
            <div className="formInput">
              <input className="input" placeholder="What needs to be done?" value={this.state.textboxValue} onChange={this.handleTextboxValueChange} onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addTodo);
                }}/>
              <i className="downArrow fa fa-angle-down"></i>
            </div>
          )
        }}
      </Mutation>
    )
  }
}
