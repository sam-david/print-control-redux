import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';
import { connect } from 'react-redux';

import { extrudeTool } from '../../actions/printerActions';
import './style.scss';

class Extrude extends Component {
  render() {
    let extrudeControls;
    return(
      <div>
        <Row className="extrude-button-row">
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 1)}
              >
               1 +
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 5)}
              >
               5 +
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 10)}
              >
               10 +
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 50)}
              >
               50 +
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 100)}
              >
               100 +
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="green extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, 150)}
              >
               150 +
            </Button>
          </Col>
        </Row>
        <Row className="extrude-button-row">
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -1)}
              >
               1 -
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -5)}
              >
               5 -
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -10)}
              >
               10 -
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -50)}
              >
               50 -
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -100)}
              >
               100 -
            </Button>
          </Col>
          <Col s={2} className="extrude-button-column">
            <Button
                className="red extrude-button"
                waves="light"
                onClick={() => this.props.extrudeTool(this.props.selectedPrinter, -150)}
              >
               150 -
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}


Extrude.propTypes = {
  jogPrinthead: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, { extrudeTool })(Extrude);
