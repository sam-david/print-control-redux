import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

import Jog from './Jog';
import Extrude from './Extrude';
import Temp from './Temp/index.js';

import './style.scss';

class PrinterControls extends Component {
  render() {
    return(
      <div>
        PrinterControls
        <Row>
          <Col s={12}>
            <Extrude />
          </Col>
        </Row>
        <Row>
          <Col s={6} className="printer-control-column">
            <Temp />
          </Col>
          <Col s={6}>
            <Jog />
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(PrinterControls);
