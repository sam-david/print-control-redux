import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

import Jog from './Jog/index';
import Extrude from './Extrude/index';
import Temp from './Temp/index';

import './style.scss';

class PrinterControls extends Component {
  render() {
    if (this.props.printerStatus != 'Printing') {
      return(
        <div>
          <Row className="extrude-row">
            <Col s={12} className="extrude-column">
              <Extrude />
            </Col>
          </Row>
          <Row>
            <Col s={12} className="printer-control-column">
              <Temp />
            </Col>
          </Row>
          <Row>
            <Col s={12}>
              <Jog />
            </Col>
          </Row>
        </div>
      )
    } else {
      return(
        <div>
            <Row>
              <Col s={12}>
                <h1>Currently Printing</h1>
              </Col>
            </Row>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage,
  printerStatus: state.printers.printerStatus
})

export default connect(mapStateToProps, {})(PrinterControls);
