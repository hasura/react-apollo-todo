import React from 'react';
import { Query } from "react-apollo";
import TodoItem from './TodoItem';
import {
  QUERY_PRIVATE_TODO,
} from './TodoQueries';

const TodoPrivateList = ({userId, type}) => (
  <Query query={QUERY_PRIVATE_TODO} variables={ {userId: userId} }>
    {({loading, error, data, refetch}) => {
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
        <div className="todoListwrapper">
          <ul>
          {
            data.todos.map((todo, index) => {
              return (
                <TodoItem key={index} todo={todo} type={type} userId={userId} />
              );
            })
          }
          </ul>
        </div>
      )
    }}
  </Query>
);

export default TodoPrivateList;
