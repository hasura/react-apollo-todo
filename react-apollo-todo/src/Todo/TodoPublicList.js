import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Query, Subscription } from "react-apollo";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import {
  SUBSCRIPTION_TODO_PUBLIC_LIST,
  QUERY_PUBLIC_TODO
} from "./TodoQueries";

class TodoPublicList extends Component {
  constructor() {
    super();
    this.state = {
      filter: "all",
      clearInProgress: false,
      dataLength: 0,
      showNew: false,
      newData: null
    };
  }
  filterResults(type) {
    this.setState({ filter: type });
  }
  loadMore() {
    console.log("Inside load more");
    this.setState({ ...this.state, showNew: true });
  }
  render() {
    const { userId, type } = this.props;
    return (
      <Query query={QUERY_PUBLIC_TODO}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <div>Loading. Please wait...</div>;
          }
          if (error) {
            return <div>{""}</div>;
          }
          // apply filters for displaying todos
          let finalData = data.todos;
          if (this.state.filter === "active") {
            finalData = data.todos.filter(todo => todo.is_completed !== true);
          } else if (this.state.filter === "completed") {
            finalData = data.todos.filter(todo => todo.is_completed === true);
          }
          const dataLength = finalData.length;
          const todoId = dataLength ? finalData[0].id : null;
          console.log(todoId);
          return (
            <Subscription
              subscription={SUBSCRIPTION_TODO_PUBLIC_LIST}
              variables={{ todoId: todoId }}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  return <div>Loading. Please wait...</div>;
                }
                if (error) {
                  return <div>{""}</div>;
                }
                if (data.todos.length > finalData.length) {
                  this.loadMore();
                  // refetch();
                }
                let showNewHtml = null;
                if (this.state.showNew) {
                  showNewHtml = <div>Load More</div>;
                }
                return (
                  <Fragment>
                    <div className="todoListwrapper">
                      {showNewHtml}
                      <ul>
                        {finalData.map((todo, index) => {
                          return (
                            <TodoItem
                              key={index}
                              todo={todo}
                              type={type}
                              userId={userId}
                            />
                          );
                        })}
                      </ul>
                    </div>
                    <TodoFilters
                      todos={data.todos}
                      userId={userId}
                      type={type}
                      currentFilter={this.state.filter}
                      filterResults={this.filterResults.bind(this)}
                    />
                  </Fragment>
                );
              }}
            </Subscription>
          );
        }}
      </Query>
    );
  }
}

TodoPublicList.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string
};

export default TodoPublicList;
