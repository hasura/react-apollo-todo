import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import {
  QUERY_PRIVATE_TODO,
} from './TodoQueries';

class TodoPrivateList extends Component {
  constructor() {
    super();
    this.state = { filter: 'all' };
  }
  filterResults(type) {
    this.setState({ filter: type });
  }
  render() {
    const { userId, type } = this.props;
    return (
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
          // apply filters for displaying todos
          let finalData = data.todos;
          if (this.state.filter === 'active') {
            finalData = data.todos.filter((todo) => todo.is_completed !== true);
          } else if (this.state.filter === 'completed') {
            finalData = data.todos.filter((todo) => todo.is_completed === true);
          }
          return (
            <Fragment>
              <div className="todoListwrapper">
                <ul>
                {
                  finalData.map((todo, index) => {
                    return (
                      <TodoItem key={index} todo={todo} type={type} userId={userId} />
                    );
                  })
                }
                </ul> 
              </div>
              <TodoFilters 
                todos={data.todos} 
                userId={userId} 
                type={type} 
                currentFilter={this.state.filter}
                filterResults={this.filterResults.bind(this)} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
};

export default TodoPrivateList;
