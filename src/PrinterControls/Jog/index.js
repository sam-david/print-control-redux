import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button } from 'react-materialize';
import { connect } from 'react-redux';

import { jogPrinthead, homeAxes } from '../../actions/printerActions';
import {NotificationContainer, NotificationManager} from 'react-notifications';


import './style.scss';

class Jog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      safeToJog: true
    };
  }


  // button icons: add_circle_outline, add_circle, add_box, add, arrow_upward, arrow_drop_down_circle, arrow_drop_up, keyboard_arrow_down, keyboard_arrow_left, keyboard_arrow_right, keyboard_arrow_up
  jogWithTimeout(axis) {
    let jogTimeout = 500;
    if (this.state.safeToJog) {
      this.setState({safeToJog: false});
      this.props.jogPrinthead(this.props.selectedPrinter, axis);
      setTimeout(() => {
        this.setState({safeToJog: true});
      }, jogTimeout);
    }
  }

  // center button icons: crop_3_2, gps_fixed, gps_not_fixed, gamepad, fullscreen_exit, border_inner
  render() {
    return(
      <Table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-xy-cell">
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: 100})}
              >
               100
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_upward"
                onClick={() => this.jogWithTimeout({z: 100})}
              >
                100
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-xy-cell">
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: 50})}
              >
               50
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_upward"
                onClick={() => this.jogWithTimeout({z: 50})}
              >
                50
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-xy-cell">
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: 10})}
              >
               10
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_upward"
                onClick={() => this.jogWithTimeout({z: 10})}
              >
                10
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-xy-cell">
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: 5})}
              >
               5
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_upward"
                onClick={() => this.jogWithTimeout({z: 5})}
              >
                5
              </Button>
            </td>
          </tr>
          <tr className="jog-middle-row">
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: -100})}
              >
               -100
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: -50})}
              >
               -50
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: -10})}
              >
               -10
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: -5})}
              >
               -5
              </Button>
            </td>
            <td>
             <Button
                floating
                large
                className="red"
                waves="light"
                icon="gps_fixed"
                onClick={() => this.props.homeAxes(this.props.selectedPrinter, ['x', 'y'])}
              />
           </td>
           <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: 5})}
              >
               5
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: 10})}
              >
               10
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: 50})}
              >
               50
              </Button>
            </td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({x: 100})}
              >
               100
              </Button>
            </td>
            <td>
              <Button
                floating
                large
                className="red"
                waves="light"
                icon="border_horizontal"
                onClick={() => this.props.homeAxes(this.props.selectedPrinter, ['z'])}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: -5})}
              >
               -5
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large

                icon="arrow_downward"
                onClick={() => this.jogWithTimeout({z: -5})}
              >
                -5
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: -10})}
              >
               -10
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_downward"
                onClick={() => this.jogWithTimeout({z: -10})}
              >
                -10
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: -50})}
              >
               -50
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_downward"
                onClick={() => this.jogWithTimeout({z: -50})}
              >
                -50
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Button
                className="blue jog-button"
                waves="light"
                onClick={() => this.jogWithTimeout({y: -100})}
              >
               -100
              </Button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="jog-z-cell">
              <Button
                node="a"
                waves="light"
                large
                icon="arrow_downward"
                onClick={() => this.jogWithTimeout({z: -100})}
              >
                -100
              </Button>
            </td>
          </tr>

        </tbody>
      </Table>
    )
  }
}

Jog.propTypes = {
  jogPrinthead: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, { jogPrinthead, homeAxes })(Jog);
