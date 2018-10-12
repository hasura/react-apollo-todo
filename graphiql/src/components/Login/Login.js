import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { updateGraphQLEndpoint } from '../ApiExplorer/Actions';

class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = { graphqlEndpoint: '' };
  }
  setGraphQLEndpoint(e) {
    this.setState({ ...this.state, graphqlEndpoint: e.target.value });
  }
  render() {
    const { dispatch } = this.props;
    console.log(this.props);
    return (
      <div className="loginWrapper">
        <h2 className="loginHeading"> Online GraphiQL </h2>
        <div className="login">
          <div>
            <form>
              <input
                type="text"
                id="username"
                className="loginTextbox"
                placeholder="Enter GraphQL Endpoint"
                autoFocus
                onChange={this.setGraphQLEndpoint.bind(this)}
              />
              <button
                className="loginButton"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('inside');
                  dispatch(updateGraphQLEndpoint(this.state.graphqlEndpoint));
                }}
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default LoginComponent;
