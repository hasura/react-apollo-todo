import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import TodoPublicWrapper from "../Todo/TodoPublicWrapper";
import TodoPrivateWrapper from "../Todo/TodoPrivateWrapper";
import OnlineUsers from "../Todo/OnlineUsers";
import { Navbar, Button } from "react-bootstrap";
class App extends Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      window.location.href = "/";
    }
    return (
      <div className="container-fluid noPadd">
        <Navbar fluid className="removeMarBottom">
          <Navbar.Header className="navheader">
            <Navbar.Brand className="navBrand">
              GraphQL Tutorial App
            </Navbar.Brand>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="primary"
                className="btn-margin logoutBtn"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="primary"
                className="btn-margin logoutBtn"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar>
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
