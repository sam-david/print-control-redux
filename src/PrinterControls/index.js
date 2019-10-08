import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';

import Jog from './Jog/index';
import Extrude from './Extrude/index';
import Temp from './Temp/index';

import { connectToPrinter } from '../actions/printerActions';

import './style.scss';

class PrinterControls extends Component {
  render() {
    if (this.props.connectionStatus == 'Closed' || this.props.connectionStatus == null) {
      return(
        <Row className="home-screen-container">
          <Col s={12}>
            <h2>Connect Printer to Control</h2>
            <Button
              floating
              large
              className="red connect-button"
              waves="light"
              icon="grade"
              onClick={() => this.props.connectToPrinter(this.props.selectedPrinter)}
            />
          </Col>
        </Row>
      )
    } else if (this.props.printerStatus != 'Printing') {
      return(
        <div>
          <Extrude />
          <Row>
            <Col s={12} className="printer-control-column">
              <Temp />
            </Col>
          </Row>
          <Row>
            <Col s={12}>
              <Jog />
            </Col>
          </Row>
        </div>
      )
    } else {
      return(
        <div>
            <Row>
              <Col s={12}>
                <h1>Currently Printing</h1>
              </Col>
            </Row>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage,
  printerStatus: state.printers.printerStatus,
  connectionStatus: state.printers.connectionStatus,
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, { connectToPrinter })(PrinterControls);
