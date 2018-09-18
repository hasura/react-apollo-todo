import React, { Component } from 'react';
import './App.css';

class ToDoWrapper extends Component {
  render() {
    return (
      <div className="todoWrapper">
        <div className="formInput">
          <input type="text" placeholder="What needs to be done?" />
          <i className="downArrow fa fa-angle-down"></i>
        </div>
        <div className="todoListwrapper">
          <ul>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
            <li>
              <div className="view">
                <div className="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
              </div>
              <div className="labelContent">Sample</div>
              <button className="closeBtn">x</button>
            </li>
          </ul>
        </div>
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

export default ToDoWrapper;
