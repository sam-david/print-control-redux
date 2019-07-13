import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'react-materialize';
import { connect } from 'react-redux';

import { selectPage } from '../actions/navActions';

import './style.scss';

class NavBar extends Component {
  // PrinterSelect icon: border_inner, select_all, view_list, view_module, local_printshop
  // Terminal icon: dvr, developer_board, dehaze, chrome_reader_mode, cast_connected, call_to_action, airplay, reorder
  // Nanoleaf icon: signal_cellular_null, signal_cellular_4_bar, stop, change_history, check_box_outline_blank
  render() {
    return (
      <Row className="nav-bar-row">
        <Col s={2} onClick={() => this.props.selectPage('PrinterSelect')} className={this.props.selectedPage === 'PrinterSelect' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            view_module
          </Icon>
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('Home')} className={this.props.selectedPage === 'Home' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            home
          </Icon>
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterControls')} className={this.props.selectedPage === 'PrinterControls' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            gamepad
          </Icon>
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterFiles')} className={this.props.selectedPage === 'PrinterFiles' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            folder
          </Icon>
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('PrinterTerminal')} className={this.props.selectedPage === 'PrinterTerminal' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            call_to_action
          </Icon>
        </Col>
        <Col s={2} onClick={() => this.props.selectPage('Nanoleaf')} className={this.props.selectedPage === 'Nanoleaf' ? 'nav-button active-nav' : 'nav-button'}>
          <Icon className="nav-icon">
            change_history
          </Icon>
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
  selectedPrinter: state.printers.selectedPrinter,
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, { selectPage })(NavBar);
