import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "../App.css";

const TodoItem = ({ todo, type, userId }) => (
  <Mutation
    mutation={gql`
      mutation toggle_todo($id: Int!, $is_completed: Boolean!) {
        update_todos(
          where: { id: { _eq: $id } }
          _set: { is_completed: $is_completed }
        ) {
          affected_rows
          returning {
            id
            is_completed
          }
        }
      }
    `}
  >
    {updateHandler => (
      <li
        onClick={() => {
          updateHandler({
            variables: {
              id: todo.id,
              is_completed: !todo.is_completed
            }
          });
          // handleTodoToggle(updateTodo, todo, type, userId);
        }}
      >
        <div className="view">
          {todo.is_completed ? (
            <div className="round">
              <input
                checked={true}
                type="checkbox"
                id={todo.id}
                onChange={() => {
                  // handleTodoToggle(updateTodo, todo, type, userId);
                }}
              />
              <label htmlFor={todo.id} />
            </div>
          ) : (
            <div className="round">
              <input
                type="checkbox"
                checked={false}
                id={todo.id}
                onChange={() => {
                  // handleTodoToggle(updateTodo, todo, type, userId);
                }}
              />
              <label htmlFor={todo.id} />)
            </div>
          )}
        </div>
        <div className="labelContent">
          {todo.is_completed ? (
            <strike className="todoLabel">{todo.text}</strike>
          ) : (
            <div>{todo.text}</div>
          )}
        </div>
        <button
          className="closeBtn"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            // handleTodoDelete(deleteTodo, todo, type, userId);
          }}
        >
          x
        </button>
      </li>
    )}
  </Mutation>
);

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  type: PropTypes.string,
  userId: PropTypes.string
};

export default TodoItem;
