import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GRAPHQL_URL } from "../constants";
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
      <Fragment>
        <div className="todoListwrapper">
          <ul>
            {sampleTodos.map((todo, index) => {
              return (
                <TodoItem key={index} todo={todo} type={type} userId={userId} />
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

TodoPrivateList.propTypes = {
  userId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default TodoPrivateList;
