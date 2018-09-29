import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "../App.css";

class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      textboxValue: ""
    };
  }

  handleTextboxValueChange(e) {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  }

  handleTextboxKeyPress(e, insertTodo) {
    // Insert on enter
    if (e.key === "Enter") {
      const newTodo = this.state.textboxValue;
      const userId = this.props.userId;
      insertTodo({
        variables: {
          todo: {
            user_id: userId,
            text: newTodo
          }
        }
      });
      this.setState({
        ...this.state,
        textboxValue: ""
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={gql`
          mutation insert($todo: todos_insert_input!) {
            insert_todos(objects: [$todo]) {
              affected_rows
            }
          }
        `}
      >
        {insertTodo => (
          <div className="formInput">
            <input
              className="input"
              placeholder="What needs to be done?"
              value={this.state.textboxValue}
              onChange={this.handleTextboxValueChange.bind(this)}
              onKeyPress={e => {
                this.handleTextboxKeyPress(e, insertTodo);
              }}
            />
            <i className="downArrow fa fa-angle-down" />
          </div>
        )}
      </Mutation>
    );
  }
}

TodoInput.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string
};

export default TodoInput;
