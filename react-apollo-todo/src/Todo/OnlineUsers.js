import React, { Component } from "react";
import { Subscription } from "react-apollo";

class OnlineUsers extends Component {
  render() {
    const online_users = [{ name: "someUser1" }, { name: "someUser2" }];
    return (
      <div className="sliderMenu grayBgColor">
        <div className="sliderHeader">Online users - {online_users.length}</div>
        {online_users.map(user => {
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
  }
}

export default OnlineUsers;
