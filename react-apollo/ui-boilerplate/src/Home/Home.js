import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import TodoPublicWrapper from "../Todo/TodoPublicWrapper";
import TodoPrivateWrapper from "../Todo/TodoPrivateWrapper";
import OnlineUsers from "../Todo/OnlineUsers";

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
            You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        </div>
      );
    }
    return (
      <div className="container-fluid noPadd">
        <div className="col-xs-12 col-md-12 col-lg-9 col-sm-12 noPadd">
          <div className="col-md-6 col-sm-12">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">Personal todos</div>
              <TodoPrivateWrapper />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-sm-12 grayBgColor todoMainWrapper commonBorRight">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">Public todos</div>
              <TodoPublicWrapper />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-lg-3 col-md-12 col-sm-12 noPadd">
          <OnlineUsers />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default App;
