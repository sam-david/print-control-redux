import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import { NotificationManager} from 'react-notifications';

import { connectToPrinter, setToolTemp, setBedTemp, disconnectFromPrinter, jogPrinthead, homeAxes } from '../actions/printerActions';
import { printerStats } from '../utilities/printerStats';
import Stream from '../Stream';

class Operational extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bedLevelingStage: 0
    }

    this.levelBed = this.levelBed.bind(this);
  }

  levelBed() {
    // 1 Bottom left, 2 Bottom Right, 3 Top Right, 4 Top Left
    // home, 1, 3, 4, 2, 1, 3, 2, 4

    let selectedPrinter = this.props.selectedPrinter;
    if (selectedPrinter == 'prusa' || selectedPrinter == 'lulzbot') {
      NotificationManager.error('Cannot Level Printer');
    } else {
      NotificationManager.success('Starting Stage: ' + this.state.bedLevelingStage);
      let cornerOffset;
      if (selectedPrinter == 'makergear') {
        cornerOffset = 50;
      } else if (selectedPrinter == 'ender') {
        cornerOffset = 30;
      }
      let selectedPrinterStats = printerStats(selectedPrinter);
      let xLength = selectedPrinterStats.xMax - (cornerOffset * 2);
      let yLength = selectedPrinterStats.yMax - (cornerOffset * 2);
      let jogAxesDistance;
      let that = this;

      switch(this.state.bedLevelingStage) {
        case 0:
          // TODO: Investigate with makergear
          this.props.homeAxes(this.props.selectedPrinter, ['x','y','z']);
          break;
        case 1:
          // Pos 1
          jogAxesDistance = {
            speed: 2000,
            x: cornerOffset,
            y: cornerOffset,
            z: 15,
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance)

          // Z lift
          jogAxesDistance = {
            z: 0.1,
            speed: 2000,
            absolute: true
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance)
          break;
        case 2:
          // Pos 3
          jogAxesDistance = {
            x: xLength,
            y: yLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 3:
          // Pos 4
          jogAxesDistance = {
            x: -xLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 4:
          // Pos 2
          jogAxesDistance = {
            x: xLength,
            y: -yLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 5:
          // Pos 1
          jogAxesDistance = {
            x: -xLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 6:
          // Pos 3
          jogAxesDistance = {
            x: xLength,
            y: yLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 7:
          // Pos 2
          jogAxesDistance = {
            y: -yLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 8:
          // Pos 4
          jogAxesDistance = {
            x: -xLength,
            y: yLength
          }
          this.props.jogPrinthead(this.props.selectedPrinter, jogAxesDistance);
          break;
        case 9:
          this.props.homeAxes(this.props.selectedPrinter, ['x','y','z']);
          break;
        default:
          console.log("BACK TO 0");
          that.setState({
            bedLevelingStage: 0
          });
          break;
      }

      let currentStage = this.state.bedLevelingStage;
      if (currentStage == 9) {
        NotificationManager.success('Bed Leveling Complete!');
        this.setState({
          bedLevelingStage: 0
        })
      } else {
        NotificationManager.info('Bed Leveling Pos: ' + currentStage);
        this.setState({
          bedLevelingStage: currentStage + 1
        })
      }
    }
  }

  moveToLoad(printer) {
    let selectedPrinterStats = printerStats(printer);
    let axes = {
      x: selectedPrinterStats.xMax / 2,
      y: selectedPrinterStats.yMax / 2,
      z: 100,
      absolute: true,
      speed: 2000
    }
    this.props.homeAxes(this.props.selectedPrinter, ['x','y','z'])
    this.props.jogPrinthead(this.props.selectedPrinter, axes)
  }

  renderBedLevelButton() {
    let bedLevelingStage = this.state.bedLevelingStage;
    let buttonText;
    if (bedLevelingStage == 0) {
      buttonText = "Start Bed Leveling";
    } else if (bedLevelingStage == 9) {
      buttonText = "Finish Bed Leveling";
    } else {
      buttonText = "Level Step: " + bedLevelingStage;
    }

    return (
      <Button
        onClick={() => this.levelBed() }
        className="yellow darken-2 large-width-button"
      >
        { buttonText }
        <Icon>
          grid_on
        </Icon>
      </Button>
    )
  }

  render() {
    return(
      <div className="operational-container">
          <Row className="operational-row">

            <Col s={6}>
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
            <Col s={6}>
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
            <Col s={6}>
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
            <Col s={6}>
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
          </Row>
          <Row className="operational-row">
            <Col s={12}>
              <Button
                className="purple large-width-button"
                onClick={() => this.moveToLoad(this.props.selectedPrinter)}
              >
                LOADING POSITION
                <Icon>arrow_forward</Icon>
              </Button>
            </Col>
          </Row>
          <Row className="operational-row">
            <Col s={12}>
              { this.renderBedLevelButton() }
            </Col>
          </Row>
          <Row className="operational-row">
            <Col s={12}>
              <Button
                className="red darken-2 large-width-button"
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
