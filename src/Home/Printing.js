import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux';
import ReactNoSleep from 'react-no-sleep';

import { cancelPrintJob } from '../actions/printerActions';
import Stream from '../Stream';
import './printing.scss';

class Printing extends Component {
  confirmAndCancelJob() {
    let confirmCancel = window.confirm("Are you sure you want to cancel job?");

    if (confirmCancel) {
      this.props.cancelPrintJob(this.props.selectedPrinter);
    }
  }

  parsePrintTime(time) {
    let seconds = Math.floor(time % 60);
    let hours = Math.floor((time / 60) / 60);
    let minutes = Math.floor(time / 60);
    let hourMinutes = Math.floor((time / 60) - (hours * 60))
    if (hours > 0) {
      return hours + " hours " + hourMinutes + " min. ";
    } else {
      return minutes + " min.";
    }
    // return Moment("2015-01-01").startOf('day')
    // .seconds(time)
    // .format('H:mm:ss');
  }

  render() {
    return(
      <div className="cancel-container">
        <Row>
          <Col s={8}>
            <h1>Printing...</h1>
          </Col>
          <Col s={4}>
            <p className="no-sleep-heading">No Sleep Status:</p>
            <ReactNoSleep>
              {({ isOn, enable, disable }) => (
                <Button className="no-sleep-button" onClick={isOn ? disable : enable}>
                  {isOn ? 'on' : 'off'}
                </Button>
              )}
            </ReactNoSleep>
          </Col>
        </Row>
        <Row className="progress-bar-row">
          <Col s={12} className="progress-bar-column">
            <ProgressBar className={this.props.selectedPrinter} progress={this.props.printProgress} />
          </Col>
        </Row>
        <Row>
          <Col s={12} className="progress-percent-column">
            <p className="progress-precent">
            { Math.round(this.props.printProgress, 2) }%
            </p>
          </Col>
        </Row>
        <Row className="progress-bar-row">
          <Col s={12} className="print-time">
            { this.parsePrintTime(this.props.printTimeLeft) }
          </Col>
        </Row>
        <Row>
          <Stream />
        </Row>
        <Row>
          <Col s={12}>
            <Button
              className="red darken-1 cancel-button"
              onClick={() => this.confirmAndCancelJob()}
            >
              Cancel Print
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

Printing.propTypes = {
  cancelPrintJob: PropTypes.func,
  selectedPrinter: PropTypes.string,
  printTimeLeft: PropTypes.number,
  printProgress: PropTypes.number
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter,
  printTimeLeft: state.printers.printTimeLeft,
  printProgress: state.printers.printProgress
})

export default connect(mapStateToProps, {
  cancelPrintJob
})(Printing);
