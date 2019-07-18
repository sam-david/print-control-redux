import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';

import { setToolTemp, setBedTemp } from '../../actions/printerActions';

import { eventConsoleLog } from '../../utilities/consoleLog';

import './style.scss';

class Temp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localTargetToolTemp: 210,
      localTargetBedTemp: 60
    }

    this.onChangeToolhead = this.onChangeToolhead.bind(this);
    this.onChangeBed = this.onChangeBed.bind(this);
    this.onBlurBed = this.onBlurBed.bind(this);
    this.onBlurToolhead = this.onBlurToolhead.bind(this);
    this.turnOffBed = this.turnOffBed.bind(this);
    this.turnOffToolhead = this.turnOffToolhead.bind(this);
  }

  onChangeBed(e) {
    this.setState({
      localTargetBedTemp: e.target.value
    })
  }

  onChangeToolhead(e) {
    this.setState({
      localTargetToolTemp: e.target.value
    })
  }

  onBlurToolhead() {
    let targetToolTemp = this.state.localTargetToolTemp;
    eventConsoleLog("set_tool_temp", targetToolTemp);
    this.props.setToolTemp(this.props.selectedPrinter, targetToolTemp)
  }

  turnOffToolhead() {
    eventConsoleLog("set_tool_temp", 0);
    this.props.setToolTemp(this.props.selectedPrinter, 0)
  }

  onBlurBed() {
    let targetBedTemp = this.state.localTargetBedTemp;
    eventConsoleLog("set_bed_temp", targetBedTemp);
    this.props.setBedTemp(this.props.selectedPrinter, targetBedTemp)
  }

  turnOffBed() {
    eventConsoleLog("set_bed_temp", 0);
    this.props.setBedTemp(this.props.selectedPrinter, 0)
  }


  renderBedTemps() {
    let that = this;
    // if (this.props.bedTempTarget) {
    //   return (
    //     { that.props.bedTemp } | { that.props.bedTempTarget}
    //   )
    // } else {
    //   return (
    //     { that.props.bedTemp }
    //   )
    // }

  }

  render() {
    // toolhead icons: headset, flash_on
    // off button icons: do_not_disturb_off, flash_off, gps_off, grid_off, highlight_off
    let toolTemps;
    let bedTemps;

    if (this.props.toolTempTarget != 0 && this.props.toolTempTarget != null) {
      toolTemps = this.props.toolTemp + "°C | " + this.props.toolTempTarget + "°C"
    } else if (this.props.toolTemp != null) {
      toolTemps = this.props.toolTemp + "°C"
    }

    if (this.props.bedTempTarget != 0 && this.props.bedTempTarget != null) {
      bedTemps = this.props.bedTemp + "°C | " + this.props.bedTempTarget + "°C"
    } else if (this.props.bedTemp != null) {
      bedTemps = this.props.bedTemp + "°C"
    } else {
      bedTemps = "Printer Disconnected"
    }

    return(
      <div>
        <Row className="temp-row top">
          <Col s={2} className="icon-column">
            <Icon className="temp-icon">
              flash_on
            </Icon>
          </Col>
          <Col s={4} className="temp-label-column">
            <p className="temp-label">
             { toolTemps }
            </p>
          </Col>
          <Col s={4} className="temp-input-column">
            <input type="number" name="localTargetToolTemp" value={this.state.localTargetToolTemp} onChange={this.onChangeToolhead} onBlur={this.onBlurToolhead}/>
          </Col>
          <Col s={2} className="temp-button-off-column">
            <Button
              floating
              large
              className="red"
              waves="light"
              icon="flash_off"
              onClick={this.turnOffToolhead}
            />
          </Col>
        </Row>
        <Row className="temp-row bottom">
          <Col s={2} className="icon-column">
            <Icon className="temp-icon">
              grid_on
            </Icon>
          </Col>
          <Col s={4} className="temp-label-column">
            <p className="temp-label">
              { bedTemps }
            </p>
          </Col>
          <Col s={4} className="temp-input-column">
            <input type="number" name="bedTempTarget" value={this.state.localTargetBedTemp} onChange={this.onChangeBed} onBlur={this.onBlurBed}/>
          </Col>
          <Col s={2} className="temp-button-off-column">
            <Button
              floating
              large
              className="red"
              waves="light"
              icon="grid_off"
              onClick={this.turnOffBed}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

Temp.propTypes = {
  setToolTemp: PropTypes.func,
  setBedTemp: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  bedTemp: state.printers.bedTemp,
  bedTempTarget: state.printers.bedTempTarget,
  toolTemp: state.printers.toolTemp,
  toolTempTarget: state.printers.toolTempTarget,
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, {setToolTemp, setBedTemp })(Temp);
