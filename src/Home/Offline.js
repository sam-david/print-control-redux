import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter } from '../actions/printerActions';
import Stream from '../Stream';

class Offline extends Component {
  renderConnectButton() {
    // connect icons: cast_connected, add_circle, add_box, call_made, cast*, compare_arrows, data_usage, exit_to_app, flare*, gamepad, grade*, library_add, open_in_new

  }

  render() {
    return(
      <div className="home-screen-container">
        <Row>
          <Col s={12}>
            <h2>Connect To Printer</h2>
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
        <Row>
          <Col s={12}>
            <Stream />
          </Col>
        </Row>
      </div>
    )
  }
}

Offline.propTypes = {
  connectToPrinter: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, { connectToPrinter })(Offline);
