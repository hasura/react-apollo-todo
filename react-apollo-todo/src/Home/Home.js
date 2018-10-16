import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import gql from "graphql-tag";
import "../App.css";
import TodoPublicWrapper from "../Todo/TodoPublicWrapper";
import TodoPrivateWrapper from "../Todo/TodoPrivateWrapper";
import OnlineUsers from "../Todo/OnlineUsers";
class App extends Component {
  login() {
    this.props.auth.login();
  }
  updateLastSeen = () => {
    const userId = localStorage.getItem("auth0:id_token:sub");
    const timestamp = moment().format();
    if (this.props.client) {
      this.props.client
        .mutate({
          mutation: gql`
            mutation($userId: String!, $timestamp: timestamptz!) {
              update_users(
                where: { auth0_id: { _eq: $userId } }
                _set: { auth0_id: $userId, last_seen: $timestamp }
              ) {
                affected_rows
              }
            }
          `,
          variables: {
            userId: userId,
            timestamp: timestamp
          }
        })
        .then(() => {
          // handle response if required
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  componentDidMount() {
    // eslint-disable-next-line
    const lastSeenMutation = setInterval(this.updateLastSeen.bind(this), 5000);
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
              <TodoPrivateWrapper client={this.props.client} />
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-sm-12 grayBgColor todoMainWrapper commonBorRight">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">Public todos</div>
              <TodoPublicWrapper client={this.props.client} />
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
