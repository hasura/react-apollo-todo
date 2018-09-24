import React, { Component } from "react";
import { query } from "graphqurl";
import moment from "moment";
import "../App.css";
import TodoPublicWrapper from "../Todo/TodoPublicWrapper";
import TodoPrivateWrapper from "../Todo/TodoPrivateWrapper";
import OnlineUsers from "../Todo/OnlineUsers";
import { GRAPHQL_URL } from "../constants";
class App extends Component {
  login() {
    this.props.auth.login();
  }
  updateLastSeen() {
    const userId = localStorage.getItem("auth0:id_token:sub");
    const timestamp = moment().format();
    query({
      query: `
          mutation ($userId: String!, $timestamp: timestamptz!) {
            update_users (
              where:{auth0_id: {_eq: $userId}}, _set: {auth0_id: $userId, last_seen: $timestamp},
            ) {
              affected_rows
            }
          }
        `,
      endpoint: GRAPHQL_URL,
      /*
        headers: {
          'x-access-key': 'mysecretxxx',
        },
        */
      variables: {
        userId: userId,
        timestamp: timestamp
      }
    })
      .then(response => {
        // handle response if required
      })
      .catch(error => {
        console.error(error);
        // alert(JSON.stringify(error));
      });
  }
  componentDidMount() {
    // eslint-disable-next-line
    const lastSeenMutation = setInterval(this.updateLastSeen, 5000);
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
        <div className="col-md-9 noPadd todoMainWrapper">
          <div className="col-md-6">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">Private todos</div>
              <TodoPrivateWrapper />
            </div>
          </div>
          <div className="col-md-6 grayBgColor commonBorRight">
            <div className="wd95 addPaddTopBottom">
              <div className="sectionHeader">Public todos</div>
              <TodoPublicWrapper />
            </div>
          </div>
        </div>
        <div className="col-md-3 noPadd">
          <OnlineUsers />
        </div>
      </div>
    );
  }
}

export default App;
