import React, { Component } from 'react';
import TodoPrivateList from './TodoPrivateList';
import TodoInput from './TodoInput';
import '../App.css';

class TodoPrivateWrapper extends Component {
  render() {
    const userId = localStorage.getItem('auth0:id_token:sub');
    return (
      <div className="todoWrapper">
        <TodoInput userId={userId} type="private" />
        <TodoPrivateList userId={userId} type="private" />
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
      </div>
    );
  }
}

export default TodoPrivateWrapper;
