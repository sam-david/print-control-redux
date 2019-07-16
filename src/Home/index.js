import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Preloader, Icon} from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter, homeAxes, setToolTemp, setBedTemp, disconnectFromPrinter, jogPrinthead, cancelPrintJob } from '../actions/printerActions';

import Stream from '../Stream';
import './style.scss';

class Home extends Component {
  renderConnectButton() {
    // connect icons: cast_connected, add_circle, add_box, call_made, cast*, compare_arrows, data_usage, exit_to_app, flare*, gamepad, grade*, library_add, open_in_new

  }

  moveToLoad(printer) {
    if (printer === 'makergear') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 100)
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', 100)
    } else if (printer === 'lulzbot') {
      this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
      this.props.jogPrinthead(this.props.selectedPrinter, 'x', 160        )
      this.props.jogPrinthead(this.props.selectedPrinter, 'y', -80)
      this.props.jogPrinthead(this.props.selectedPrinter, 'z', 60)
    }
  }

  render() {
    if (this.props.connectionStatus == 'Closed' || this.props.connectionStatus === 'Offline' || this.props.connectionStatus === null) {
      return(
        <Row className="home-screen-container">
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
            <Stream />
          </Col>
        </Row>

      )
    } else if (this.props.connectionStatus == 'Detecting baudrate') {
      // Detecting baudrate
      return(
        <div className="detecting-container">
          <Col s={12}>
            <h1>Detecting Baudrate...</h1>
            <Preloader flashing />
          </Col>
        </div>
        )

    } else if (this.props.connectionStatus == 'Operational') {
      // Operational
      // disconnect icons: do_not_disturb_off, flash_off, gps_off
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
    } else if (this.props.connectionStatus == 'Printing') {
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
                onClick={() => this.props.cancelPrintJob(this.props.selectedPrinter)}
              >
                Cancel Print
              </Button>
            </Col>
          </Row>
        </div>
      )
    }else {
      return(
        <div className="cancel-container">
          <Row>
            <Col s={12}>
              <h1>Connecting...</h1>
            </Col>
          </Row>
          <Row>
            <Stream />
          </Row>
        </div>
      )
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

export default connect(mapStateToProps, { connectToPrinter, homeAxes, setToolTemp, setBedTemp, disconnectFromPrinter, jogPrinthead, cancelPrintJob })(Home);
