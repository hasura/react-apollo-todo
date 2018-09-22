import React from 'react';
import { Query } from "react-apollo";
import TodoItem from './TodoItem';
import {
  QUERY_PUBLIC_TODO,
} from './TodoQueries';

const TodoPublicList = () => (
  <Query query={QUERY_PUBLIC_TODO}>
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
      console.log(data);
      return (
        <div className="todoListwrapper">
          <ul>
          {
            data.todos.map((todo, index) => {
              return (
                <TodoItem key={index} todo={todo} />
              );
            })
          }
          </ul>
        </div>
      )
    }}
  </Query>
);

export default TodoPublicList;
