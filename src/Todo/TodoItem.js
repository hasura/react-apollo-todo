import React from 'react';
import { Mutation } from "react-apollo";
import '../App.css';

import {
  QUERY_PRIVATE_TODO,
  MUTATION_TODO_UPDATE,
  MUTATION_TODO_DELETE
} from './TodoQueries';

const handleTodoToggle = (toggleTodo, todo) => {
  toggleTodo({
    variables: {
      todoId: todo.id,
      set: {
        is_completed: !todo.is_completed
      }
    },
    update: (cache, { data: { update_todo }}) => {
      const data = cache.readQuery({ query: QUERY_PRIVATE_TODO })
      const toggledTodo = data.todos.find(t => t.id === todo.id)
      toggledTodo.is_completed = !todo.is_completed;
      cache.writeQuery({
        query: QUERY_PRIVATE_TODO,
        data
      })
    }
  })
}

const handleTodoDelete = (deleteTodo, todo) => {
  deleteTodo({
    variables: {
      todoId: todo.id
    },
    update: (cache, { data: { update_todo }}) => {
      const data = cache.readQuery({ query: QUERY_PRIVATE_TODO })
      data.todo = data.todos.filter(t => {
        return t.id !== todo.id
      })
      cache.writeQuery({
        query: QUERY_PRIVATE_TODO,
        data
      })
    }
  })
}

const TodoItem = ({ todo }) => (
  <Mutation mutation={MUTATION_TODO_UPDATE}>
    {(updateTodo) => {
      return (
          <Mutation mutation={MUTATION_TODO_DELETE}>
            {(deleteTodo) => {
              return (
                <li
                  onClick={e => {
                    handleTodoToggle(updateTodo, todo)
                  }}>
                  <div className="view">
                    <div className="round">
                      <input type="checkbox" id={todo.id} />
                      <label htmlFor={todo.id}></label>
                    </div>
                  </div>
                  <div className="labelContent">
                    {
                      todo.is_completed ?
                        <strike className="todoLabel">{todo.text}</strike> :
                        <label className="todoLabel">{todo.text}</label>
                    }
                  </div>
                  <button className="closeBtn"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTodoDelete(deleteTodo, todo)
                    }}>
                  x</button>
                </li>
              )
            }}
          </Mutation>
      )
    }}
  </Mutation>
)

export default TodoItem;
