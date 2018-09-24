import React from 'react';

const TodoPublicFilters = () => {
  return (
    <div className="footerList">
      <span> 0 items left </span>
      <ul>
        <li>
          <a className="selected">All</a>
        </li>
        <li>
          <a>Active</a>
        </li>
        <li>
          <a>Completed</a>
        </li>
      </ul>
      <button className="clearComp">Clear completed</button>
    </div>
  );
};

export default TodoPublicFilters;
