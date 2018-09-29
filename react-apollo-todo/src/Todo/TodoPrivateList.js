import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TodoItem from "./TodoItem";

class TodoPrivateList extends Component {
  constructor() {
    super();
  }

  render() {
    const { userId, type } = this.props;
    const sampleTodos = [
      {
        id: "1",
        text: "This is todo 1",
        is_completed: true
      },
      {
        id: "2",
        text: "This is todo 2"
      }
    ];
    return (
      <Query
        query={gql`
          query fetch_todos {
            todos(order_by: created_at_desc) {
              id
              text
              is_completed
            }
          }
        `}
        pollInterval={100}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <span>Loading...</span>;
          }
          if (error) {
            return <span>Error!</span>;
          }
          return (
            <Fragment>
              <div className="todoListwrapper">
                <ul>
                  {data.todos.map((todo, index) => {
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
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

TodoPrivateList.propTypes = {
  userId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default TodoPrivateList;
