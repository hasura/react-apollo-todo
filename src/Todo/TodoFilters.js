import React from "react";

const TodoFilters = ({ todos, userId, type, currentFilter, filterResults }) => {
  const activeTodos = todos.filter(todo => todo.is_completed !== true);
  return (
    <div className="footerList">
      <span> {activeTodos.length} items left </span>
      <ul>
        <li onClick={e => filterResults("all")}>
          <a className={currentFilter === "all" ? "selected" : ""}>All</a>
        </li>
        <li onClick={e => filterResults("active")}>
          <a
            className={
              currentFilter === "active"
                ? "selected removePaddLeft"
                : "removePaddLeft"
            }
          >
            Active
          </a>
        </li>
        <li onClick={e => filterResults("completed")}>
          <a
            className={
              currentFilter === "completed"
                ? "selected removePaddLeft"
                : "removePaddLeft"
            }
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clearComp">Clear completed</button>
    </div>
  );
};

export default TodoFilters;
