import React from "react";
import PropTypes from "prop-types";

const TodoFilters = ({ todos, currentFilter, filterResults }) => {
  const activeTodos = todos.filter(todo => todo.is_completed !== true);
  return (
    <div className="footerList">
      <span> {activeTodos.length} items left </span>
      <ul>
        <li onClick={() => filterResults("all")}>
          <a className={currentFilter === "all" ? "selected" : ""}>All</a>
        </li>
        <li onClick={() => filterResults("active")}>
          <a className={currentFilter === "active" ? "selected" : ""}>Active</a>
        </li>
        <li onClick={() => filterResults("completed")}>
          <a className={currentFilter === "completed" ? "selected" : ""}>
            Completed
          </a>
        </li>
      </ul>
      <button className="clearComp">Clear completed</button>
    </div>
  );
};

TodoFilters.propTypes = {
  todos: PropTypes.array.isRequired,
  userId: PropTypes.string,
  type: PropTypes.string,
  currentFilter: PropTypes.string,
  filterResults: PropTypes.func
};

export default TodoFilters;
