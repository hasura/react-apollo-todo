import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import "../App.css";

const TodoItem = ({ todo, type, userId }) => (
  <li
    onClick={() => {
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
);

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  type: PropTypes.string,
  userId: PropTypes.string
};

export default TodoItem;
