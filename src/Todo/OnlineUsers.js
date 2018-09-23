import React from 'react';
import { Subscription } from "react-apollo";
import moment from 'moment';
import {
  SUBSCRIPTION_ONLINE_USERS,
} from './TodoQueries';

const OnlineUsers = () => {
  const timestamp = moment().subtract(30, 'seconds').format()
  return (
    <Subscription subscription={SUBSCRIPTION_ONLINE_USERS} variables={{ timestamp: timestamp }}>
      {({loading, error, data}) => {
        if (loading) {
          return (
            <div>Loading. Please wait...</div>
          );
        }
        if (error) {
          return (
            <div>{""}</div>
          );
        }
        return (
          <div className="sliderMenu grayBgColor">
            <div className="sliderHeader">
              Online users - {data.users.length}
            </div>
            {data.users.map((user) => {
              return (
              <div key={user.id} className="userInfo">
                <div className="userImg">
                  <i className="far fa-user"></i>
                </div>
                <div className="userName">
                  {user.name}
                </div>
              </div>
              );
            })}
          </div>
        )
      }}
    </Subscription>
  );
}

export default OnlineUsers;
