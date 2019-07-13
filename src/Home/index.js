import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter } from '../actions/printerActions';

import './style.scss';

class Home extends Component {
  render() {
    if (this.props.connectionStatus == 'Closed') {
      return(
        <Row>
          <Col s={12}>
            <Button onClick={() => this.props.connectToPrinter(this.props.selectedPrinter)}>
              Connect To Printer
            </Button>
          </Col>
        </Row>

      )
    } else if (this.props.connectionStatus == 'Detecting Baudrate') {
      return(
        <Row>
          <Col s={12}>
            <h1>Detecting Baudrate...</h1>
          </Col>
        </Row>
      )
    } else if (this.props.connectionStatus == 'Operational') {
      return(
        <Row>
          <Col s={3}>
            <Button>
              LOAD PLA
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              LOAD HTPLA
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              WARM BED 45
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              WARM BED 60
            </Button>
          </Col>
        </Row>
      )
    } else if (this.props.connectionStatus == 'Printing') {
      return(
        <Row>
          <Col s={3}>
            <Button>
              LOAD PLA
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              LOAD HTPLA
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              WARM BED 45
            </Button>
          </Col>
          <Col s={3}>
            <Button>
              WARM BED 60
            </Button>
          </Col>
        </Row>
      )
    }else {
      return(<div />)
    }
  }
}

Home.propTypes = {
  connectToPrinter: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage,
  selectedPrinter: state.printers.selectedPrinter,
  connectionStatus: state.printers.connectionStatus,
  printerStatus: state.printers.printerStatus
})

export default connect(mapStateToProps, {connectToPrinter})(Home);
