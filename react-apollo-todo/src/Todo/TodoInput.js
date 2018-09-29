import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
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

  handleTextboxKeyPress(e, addTodo) {
    // Insert on enter
    if (e.key === "Enter") {
      const newTodo = this.state.textboxValue;
      const userId = this.props.userId;
    }
  }

  render() {
    return (
      <div className="formInput">
        <input
          className="input"
          placeholder="What needs to be done?"
          value={this.state.textboxValue}
          onChange={this.handleTextboxValueChange.bind(this)}
          onKeyPress={e => {
            // this.handleTextboxKeyPress(e, addTodo);
          }}
        />
        <i className="downArrow fa fa-angle-down" />
      </div>
    );
  }
}

TodoInput.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string
};

export default TodoInput;
