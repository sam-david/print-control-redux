import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';

import { cancelPrintJob } from '../actions/printerActions';
import Stream from '../Stream';

class Printing extends Component {
  confirmAndCancelJob() {
    let confirmCancel = window.confirm("Are you sure you want to cancel job?");

    if (confirmCancel) {
      this.props.cancelPrintJob(this.props.selectedPrinter);
    }
  }

  render() {
    return(
      <div className="cancel-container">
        <Row>
          <Col s={12}>
            <h1>Printing...</h1>
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
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, {
  cancelPrintJob
})(Printing);
