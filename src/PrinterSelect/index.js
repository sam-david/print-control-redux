import React, { Component } from 'react';
import { Row, Col} from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Logos
import mosaicLogo from '../images/Mosaic.png';
import makergearLogo from '../images/makergear-logo-white.svg';
import lulzbotLogo from '../images/lulzbot-logo-long.svg';
import enderLogo from '../images/ender-logo.svg';
import prusaLogo from '../images/prusa-i3.svg';
import connectedIcon from '../images/3d-connected.svg';

import { selectPrinter } from '../actions/printerActions';

import './style.scss';


class PrinterSelect extends Component {
  render() {
    let makergearConnectIcon;
    let lulzbotConnectIcon;

    if (this.props.selectedPrinter == 'makergear') {
      makergearConnectIcon = <img src={connectedIcon} />;
      lulzbotConnectIcon = <p></p>;
    } else {
      makergearConnectIcon = <p></p>;
      lulzbotConnectIcon = <img src={connectedIcon} />;
    }

    return (
      <div className="printer-select-container">
        <Row className="printer-select-row">
          <Col s={6} className="makergear-select-button printer-select" onClick={() => this.props.selectPrinter('makergear')}>
            <Row>
              <Col s={12}>
                <img src={makergearLogo} className="makergear-logo"/>
              </Col>
            </Row>
          </Col>
          <Col s={6} className="lulzbot-select-button printer-select" onClick={() => this.props.selectPrinter('lulzbot')}>
            <Row>
              <Col s={12}>
                <img src={lulzbotLogo} className='lulzbot-logo' />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="printer-select-row">
          <Col s={6} className="ender-select-button printer-select" onClick={() => this.props.selectPrinter('ender')}>
            <Row>
              <Col s={12}>
                <img src={enderLogo} className="ender-logo"/>
              </Col>
            </Row>
          </Col>
          <Col s={6} className="prusa-select-button printer-select" onClick={() => this.props.selectPrinter('prusa')}>
            <Row>
              <Col s={12}>
                <img src={prusaLogo} className='prusa-logo' />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

PrinterSelect.propTypes = {
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

export default connect(mapStateToProps, { selectPrinter })(PrinterSelect);
