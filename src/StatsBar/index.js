import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col} from 'react-materialize';

import { pingJobStatus } from '../actions/printerActions';

class StatsBar extends Component {

  componentWillMount() {
    let that = this;
    setInterval(function() {
      that.props.pingJobStatus(that.props.selectedPrinter);
    }, 1000);
  }

  render() {
      let targetToolTemp;
      let targetBedTemp;
      let status;

      if (this.props.toolTempTarget != 0 && this.props.toolTempTarget != null) {
        targetToolTemp = "| " + this.props.toolTempTarget + "°C"
      }

      if (this.props.bedTempTarget != 0 && this.props.bedTempTarget != null) {
        targetBedTemp = "| " + this.props.bedTempTarget + "°C"
      }

      if (this.props.printerStatus == this.props.connectionStatus) {
        status = this.props.printerStatus;
      } else if (this.props.printerStatus == null) {
        status = this.props.connectionStatus;
      }

      if (this.props.connectionStatus != 'Closed' && this.props.connectionStatus != null) {
        return (
          <Row className="top-nav-row">
            <Col s={4}>
              <span className="tool-temp">T: { this.props.toolTemp }°C {targetToolTemp}</span>
            </Col>
            <Col s={4}>
              <span className="bed-temp">B: { this.props.bedTemp }°C {targetBedTemp}</span>
            </Col>
            <Col s={4} className="print-status">
              S: { status }
            </Col>
          </Row>
        )
      } else {
        return (
          <Row className="top-nav-row">
            <Col s={12}>
              <p>NO STATUS</p>
            </Col>
          </Row>
        )
      }
    }
}

StatsBar.propTypes = {
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter,
  localTargetToolTemp: state.printers.localTargetToolTemp,
  localTargetBedTemp: state.printers.localTargetBedTemp,
  localTargetExtrudeAmount: state.printers.localTargetExtrudeAmount,
  toolTemp: state.printers.toolTemp,
  toolTempTarget: state.printers.toolTempTarget,
  bedTemp: state.printers.bedTemp,
  bedTempTarget: state.printers.bedTempTarget,
  connectionStatus: state.printers.connectionStatus,
  printerStatus: state.printers.printerStatus,
  printerProgress: state.printers.printerProgress,
  printTimeLeft: state.printers.printTimeLeft
})

export default connect(mapStateToProps, { pingJobStatus })(StatsBar);