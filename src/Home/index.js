import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Preloader, Icon} from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter, homeAxes, setToolTemp, setBedTemp, disconnectFromPrinter, jogPrinthead, cancelPrintJob } from '../actions/printerActions';

import Stream from '../Stream';
import Offline from './Offline';
import DetectingBaudrate from './DetectingBaudrate';
import Operational from './Operational';
import Printing from './Printing';
import './style.scss';

class Home extends Component {
  // render() {
  //   if (this.props.connectionStatus == 'Closed' || this.props.connectionStatus === 'Offline' || this.props.connectionStatus === null) {
  //     return(
  //       <Offline />
  //     )
  //   } else if (this.props.connectionStatus == 'Detecting baudrate') {
  //     // Detecting baudrate
  //     return(
  //       <DetectingBaudrate />
  //     )

  //   } else if (this.props.connectionStatus == 'Operational') {
  //     // Operational
  //     // disconnect icons: do_not_disturb_off, flash_off, gps_off
  //     return(
  //       <Operational />
  //     )
  //   } else if (this.props.connectionStatus == 'Printing') {
  //     return(
  //       <Printing />
  //     )
  //   }else {
  //     return(
  //       <div className="cancel-container">
  //         <Row>
  //           <Col s={12}>
  //             <h1>Connecting...</h1>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Stream />
  //         </Row>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return ( <Operational />)
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
