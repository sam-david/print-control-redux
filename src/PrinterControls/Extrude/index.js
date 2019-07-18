import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';
import { connect } from 'react-redux';

import { extrudeTool } from '../../actions/printerActions';
import './style.scss';

class Extrude extends Component {
  constructor(props) {
    super(props);

    this.state = {
      safeToExtrude: true
    };
  }

  extrudeWithTimeout(amount) {
    let extrudeTimeout = 800;
    if (this.state.safeToExtrude) {
      this.setState({safeToExtrude: false});
      this.props.extrudeTool(this.props.selectedPrinter, amount);
      setTimeout(() => {
        this.setState({safeToExtrude: true});
      }, extrudeTimeout);
    }
  }

  render() {
    if (this.props.toolTemp > 180) {
      return(
        <div>
          <Row className="extrude-button-row">
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(1)}
                >
                 1 +
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(5)}
                >
                 5 +
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(10)}
                >
                 10 +
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(50)}
                >
                 50 +
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(100)}
                >
                 100 +
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="green extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(150)}
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
                  onClick={() => this.extrudeWithTimeout(-1)}
                >
                 1 -
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="red extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(-5)}
                >
                 5 -
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="red extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(-10)}
                >
                 10 -
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="red extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(-50)}
                >
                 50 -
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="red extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(-100)}
                >
                 100 -
              </Button>
            </Col>
            <Col s={2} className="extrude-button-column">
              <Button
                  className="red extrude-button"
                  waves="light"
                  onClick={() => this.extrudeWithTimeout(-150)}
                >
                 150 -
              </Button>
            </Col>
          </Row>
        </div>
      )
    } else {
      return(
        <div />
      )
    }
  }
}


Extrude.propTypes = {
  jogPrinthead: PropTypes.func,
  selectedPrinter: PropTypes.string,
  printerStatus: PropTypes.string,
  toolTemp: PropTypes.number
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter,
  toolTemp: state.printers.toolTemp,
  printerStatus: state.printers.printerStatus
})

export default connect(mapStateToProps, { extrudeTool })(Extrude);
