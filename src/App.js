import React, { Component } from 'react';
import './App.css';
import ToDoWrapper from './ToDoWrapper';
class App extends Component {
  render() {
    return (
      <div className="container-fluid noPadd">
        <div className="header">
          This is a sample todo app
        </div>
        <div className="col-md-9 noPadd todoMainWrapper">
          <div className="col-md-6">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">
                 Private todos
              </div>
              <ToDoWrapper />
            </div>
          </div>
          <div className="col-md-6 grayBgColor commonBorRight">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">
                Public todos
              </div>
              <ToDoWrapper />
            </div>
          </div>
        </div>
        <div className="col-md-3 noPadd">
          <div className="sliderMenu grayBgColor">
            <div className="sliderHeader">
              Online users - 3
            </div>
            <div className="userInfo">
              <div className="userImg">
                <i className="far fa-user"></i>
              </div>
              <div className="userName">
                Praveen
              </div>
            </div>
            <div className="userInfo">
              <div className="userImg">
                <i className="far fa-user"></i>
              </div>
              <div className="userName">
                Karthik
              </div>
            </div>
            <div className="userInfo">
              <div className="userImg">
                <i className="far fa-user"></i>
              </div>
              <div className="userName">
                Suree
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;