import React, { Component } from "react";
import { Subscription } from "react-apollo";
import { SUBSCRIPTION_ONLINE_USERS } from "./TodoQueries";

class OnlineUsers extends Component {
  render() {
    return (
      <Subscription subscription={SUBSCRIPTION_ONLINE_USERS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading. Please wait...</div>;
          }
          if (error) {
            return <div>Error loading users</div>;
          }
          return (
            <div className="sliderMenu grayBgColor">
              <div className="sliderHeader">
                Online users - {data.online_users.length}
              </div>
              {data.online_users.map(user => {
                return (
                  <div key={user.name} className="userInfo">
                    <div className="userImg">
                      <i className="far fa-user" />
                    </div>
                    <div className="userName">{user.name}</div>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Subscription>
    );
  }
}

export default OnlineUsers;
