import React from 'react';
import { Subscription } from "react-apollo";
import TodoItem from './TodoItem';
import {
  SUBSCRIPTION_TODO_PUBLIC_LIST,
} from './TodoQueries';

const TodoPublicList = ({userId, type}) => (
  <Subscription subscription={SUBSCRIPTION_TODO_PUBLIC_LIST}>
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
  </Subscription>
);

export default TodoPublicList;
