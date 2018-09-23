import React from 'react';
import { Mutation } from "react-apollo";
import '../App.css';

import {
  QUERY_PRIVATE_TODO,
  QUERY_PUBLIC_TODO,
  MUTATION_TODO_UPDATE,
  MUTATION_TODO_DELETE
} from './TodoQueries';

const handleTodoToggle = (toggleTodo, todo, type, userId) => {
  toggleTodo({
    variables: {
      todoId: todo.id,
      set: {
        is_completed: !todo.is_completed
      }
    },
    update: (cache, { data: { update_todo }}) => {
      const query = type === 'private' ? QUERY_PRIVATE_TODO : QUERY_PUBLIC_TODO;
      if (type === 'private') {
        const data = cache.readQuery({ query: query, variables: {userId: userId} })
        const toggledTodo = data.todos.find(t => t.id === todo.id)
        toggledTodo.is_completed = !todo.is_completed;
        cache.writeQuery({
          query: query,
          variables: {
            userId: userId
          },
          data
        })
      }
    }
  })
}

const handleTodoDelete = (deleteTodo, todo, type, userId) => {
  deleteTodo({
    variables: {
      todoId: todo.id
    },
    update: (cache, { data: { update_todo }}) => {
      const query = type === 'private' ? QUERY_PRIVATE_TODO : QUERY_PUBLIC_TODO;
      if (type === 'private') {
        const data = cache.readQuery({ query: query, variables: {userId: userId} })
        data.todos = data.todos.filter(t => {
          return t.id !== todo.id
        })
        cache.writeQuery({
          query: query,
          variables: {
            userId: userId
          },
          data
        })
      }
    }
  })
}

const TodoItem = ({ todo, type, userId }) => (
  <Mutation mutation={MUTATION_TODO_UPDATE}>
    {(updateTodo) => {
      return (
          <Mutation mutation={MUTATION_TODO_DELETE}>
            {(deleteTodo) => {
              return (
                <li
                  onClick={e => {
                    handleTodoToggle(updateTodo, todo, type, userId)
                  }}>
                  <div className="view">
                    {
                      todo.is_completed ?
                      (<div className="round">
                        <input defaultChecked type="checkbox" id={todo.id} />
                        <label htmlFor={todo.id}></label>
                      </div>) :
                      (<div className="round">
                        <input type="checkbox" id={todo.id} />
                        <label htmlFor={todo.id}></label>)
                      </div>)
                    }
                  </div>
                  <div className="labelContent">
                    {
                      todo.is_completed ?
                        <strike className="todoLabel">{todo.text}</strike> :
                        <div>{todo.text}</div>
                    }
                  </div>
                  <button className="closeBtn"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTodoDelete(deleteTodo, todo, type, userId)
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
