import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from 'react-progress-bar-plus';
import Modal from 'react-bootstrap/lib/Modal';
import './progress-bar.scss';
import { NOTIF_EXPANDED } from './Actions';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  componentDidMount() {
    // Hide the loader once the react component is ready.
    // NOTE: This will execute only onces (since this is parent component for all other component).
    const className = document.getElementById('content').className;
    document.getElementById('content').className = className + ' show';
    document.getElementById('loading').style.display = 'none';
  }

  onModalClose = () => {
    this.props.dispatch({ type: NOTIF_EXPANDED, data: false });
  };

  render() {
    const styles = require('./progress-bar.scss');
    const {
      ongoingRequest,
      percent,
      intervalTime,
      children,
      isNotifExpanded,
      notifMsg,
    } = this.props;

    return (
      <ErrorBoundary>
        <div>
          {ongoingRequest && (
            <ProgressBar
              percent={percent}
              autoIncrement={true} // eslint-disable-line react/jsx-boolean-value
              intervalTime={intervalTime}
              spinner={false}
            />
          )}
          <div>{children}</div>
          <Modal
            show={isNotifExpanded}
            onHide={this.onModalClose}
            dialogClassName={styles.notifModalDialog}
          >
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="content-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <AceEditor
                      mode="json"
                      theme="github"
                      name="notif_error"
                      value={notifMsg}
                      minLines={8}
                      maxLines={100}
                      width="100%"
                      showPrintMargin={false}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  reqURL: PropTypes.string,
  reqData: PropTypes.object,
  statusCode: PropTypes.number,

  modalOpen: PropTypes.bool,
  error: PropTypes.object,
  ongoingRequest: PropTypes.bool,
  requestError: PropTypes.bool,
  connectionFailed: PropTypes.bool,

  intervalTime: PropTypes.number,
  percent: PropTypes.number,

  children: PropTypes.element,
  dispatch: PropTypes.func.isRequired,

  isNotifExpanded: PropTypes.bool,
  notifMsg: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    ...state.progressBar,
  };
};

export default connect(mapStateToProps)(App);
