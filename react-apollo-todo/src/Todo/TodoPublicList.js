import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import { Query, Subscription } from "react-apollo";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import {
  SUBSCRIPTION_TODO_PUBLIC_LIST,
  QUERY_PUBLIC_TODO,
  QUERY_FEED_PUBLIC_TODO,
  QUERY_FEED_PUBLIC_OLD_TODO
} from "./TodoQueries";

class TodoPublicList extends Component {
  constructor() {
    super();
    this.state = {
      filter: "all",
      dataLength: 0,
      showNew: false,
      showOlder: true,
      newTodosLength: 0,
      limit: 5,
      todos: []
    };
  }
  componentDidMount() {
    const { client } = this.props;
    const _this = this;
    console.log(client);
    // query for public todos
    client
      .query({
        query: QUERY_PUBLIC_TODO,
        variables: { todoLimit: this.state.limit }
      })
      .then(data => {
        this.setState({ todos: data.data.todos });
        const latestTodoId = data.data.todos.length
          ? data.data.todos[0].id
          : null;
        // start a subscription
        client
          .subscribe({
            query: SUBSCRIPTION_TODO_PUBLIC_LIST,
            variables: { todoId: latestTodoId } // update subscription when todoId changes
          })
          .subscribe({
            next(data) {
              console.log(data);
              if (data.data.todos.length) {
                _this.setState({
                  ...this.state,
                  showNew: true,
                  newTodosLength: data.data.todos.length
                });
              }
            },
            error(err) {
              console.error("err", err);
            }
          });
      });
  }
  filterResults(type) {
    this.setState({ filter: type });
  }
  loadMoreClicked() {
    const { client } = this.props;
    this.setState({ ...this.state, showNew: false, newTodosLength: 0 });
    client
      .query({
        query: QUERY_FEED_PUBLIC_TODO,
        variables: {
          todoId: this.state.todos.length ? this.state.todos[0].id : null
        }
      })
      .then(data => {
        if (data.data.todos.length) {
          const mergedTodos = data.data.todos.concat(this.state.todos);
          // update state with new todos
          this.setState({ ...this.state, todos: mergedTodos });
        }
      });
  }
  loadOlderClicked() {
    const { client } = this.props;
    client
      .query({
        query: QUERY_FEED_PUBLIC_OLD_TODO,
        variables: {
          todoId: this.state.todos.length
            ? this.state.todos[this.state.todos.length - 1].id
            : null
        }
      })
      .then(data => {
        if (data.data.todos.length) {
          const mergedTodos = this.state.todos.concat(data.data.todos);
          // update state with new todos
          this.setState({ ...this.state, todos: mergedTodos });
        } else {
          this.setState({ ...this.state, showOlder: false });
        }
      });
  }
  render() {
    const { userId, type } = this.props;

    // apply client side filters for displaying todos
    let finalTodos = this.state.todos;
    if (this.state.filter === "active") {
      finalTodos = this.state.todos.filter(todo => todo.is_completed !== true);
    } else if (this.state.filter === "completed") {
      finalTodos = this.state.todos.filter(todo => todo.is_completed === true);
    }

    // show new todo feed logic
    let showNewTodos = null;
    if (this.state.showNew && this.state.newTodosLength) {
      showNewTodos = (
        <div
          className={"loadMoreSection"}
          onClick={this.loadMoreClicked.bind(this)}
        >
          You have {this.state.newTodosLength} new{" "}
          {this.state.newTodosLength > 1 ? "todos" : "todo"}
        </div>
      );
    }

    // show old todo history logic
    let showOlderTodos = (
      <div
        className={"loadMoreSection"}
        onClick={this.loadOlderClicked.bind(this)}
      >
        Load Older Todos
      </div>
    );
    if (!this.state.showOlder) {
      showOlderTodos = (
        <div
          className={"loadMoreSection"}
          onClick={this.loadOlderClicked.bind(this)}
        >
          No more todos available
        </div>
      );
    }

    return (
      <Fragment>
        <div className="todoListwrapper">
          {showNewTodos}
          <ul>
            {finalTodos.map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  index={index}
                  todo={todo}
                  type={type}
                  userId={userId}
                  client={this.props.client}
                />
              );
            })}
          </ul>
          {showOlderTodos}
        </div>
        <TodoFilters
          todos={this.state.todos}
          userId={userId}
          type={type}
          currentFilter={this.state.filter}
          filterResults={this.filterResults.bind(this)}
        />
      </Fragment>
    );
  }
}

TodoPublicList.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string
};

export default TodoPublicList;
