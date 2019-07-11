import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

import { selectPage } from '../actions/navActions';

import './style.scss';

class NavBar extends Component {
  render() {
    return (
      <Row>
        <Col s={2} onClick={() => this.props.selectPage('PrinterSelect')}>
          SELECT PRINTER
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('Home')}>
          HOME
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterControls')}>
          CONTROLS
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterFiles')}>
          FILES
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterTerminal')}>
          TERMINAL
        </Col>
      </Row>
    );
  }
}

NavBar.propTypes = {
  selectPage: PropTypes.func,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, { selectPage })(NavBar);
