import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter, setToolTemp, setBedTemp, disconnectFromPrinter, jogPrinthead, homeAxes } from '../actions/printerActions';
import Stream from '../Stream';

class Operational extends Component {
  moveToLoad(printer) {
    if (printer === 'makergear') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 100)
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', 100)
    } else if (printer === 'lulzbot') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 160)
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', -80)
      this.props.jogPrinthead(this.props.selectedPrinter, 'z', 60)
    } else if (printer === 'ender') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 100)
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', 100)
    } else if (printer === 'prusa') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 100)
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', 100)
      this.props.jogPrinthead(this.props.selectedPrinter, 'z', 50)
    }
  }

  render() {
    return(
      <div className="operational-container">
          <Row className="operational-row">
            <Col s={4}>
              <Button className="purple" onClick={() => this.moveToLoad(this.props.selectedPrinter)}>
                LOADING
                <Icon>
                  arrow_forward
                </Icon>
              </Button>
            </Col>
            <Col s={4}>
              <Button
                className="green"
                onClick={() => this.props.setToolTemp(this.props.selectedPrinter, 210)}
              >
                HEAT PLA
                <Icon>
                  call_made
                </Icon>
              </Button>
            </Col>
            <Col s={4}>
              <Button
                onClick={() => this.props.setToolTemp(this.props.selectedPrinter, 220)}
                className="green darken-2"
              >
                HEAT HTPLA
                <Icon>
                  call_made
                </Icon>
              </Button>
            </Col>
          </Row>
          <Row className="operational-row">
            <Col s={4}>
              <Button
                onClick={() => this.props.setBedTemp(this.props.selectedPrinter, 45)}
                className="yellow darken-2"
              >
                BED 45
                <Icon>
                  grid_on
                </Icon>
              </Button>
            </Col>
            <Col s={4}>
              <Button
                onClick={() => this.props.setBedTemp(this.props.selectedPrinter, 60)}
                className="yellow darken-4"
              >
                BED 60
                <Icon>
                  grid_on
                </Icon>
              </Button>
            </Col>
            <Col s={4}>
              <Button
                className="red darken-2"
                onClick={() => this.props.disconnectFromPrinter(this.props.selectedPrinter)}
              >
                DISCONNECT
                <Icon>
                  highlight_off
                </Icon>
              </Button>
            </Col>
          </Row>
        </div>
    )
  }
}

Operational.propTypes = {
  connectToPrinter: PropTypes.func,
  jogPrinthead: PropTypes.func,
  homeAxes: PropTypes.func,
  setToolTemp: PropTypes.func,
  setBedTemp: PropTypes.func,
  disconnectFromPrinter: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, {
  connectToPrinter,
  jogPrinthead,
  homeAxes,
  setToolTemp,
  setBedTemp,
  disconnectFromPrinter
})(Operational);
