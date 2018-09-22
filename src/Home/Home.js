import React, { Component } from 'react';
import '../App.css';
import TodoWrapper from '../Todo/TodoWrapper';
class App extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return (
        <div className="container">
          <h4>
            You are not logged in! Please{' '}
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.login.bind(this)}
            >
              Log In
            </a>
            {' '}to continue.
          </h4>
        </div>
      );
    }
    return (
      <div className="container-fluid noPadd">
        <div className="col-md-9 noPadd todoMainWrapper">
          <div className="col-md-6">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">
                 Private todos
              </div>
              <TodoWrapper />
            </div>
          </div>
          <div className="col-md-6 grayBgColor commonBorRight">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">
                Public todos
              </div>
              <TodoWrapper />
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
