import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {NotificationContainer, NotificationManager} from 'react-notifications';

import './style.scss';

class BorderWrapper extends Component {
  render() {
    return (
      <div className={'print-control-container ' + this.props.selectedPrinter}>
        { this.props.children }
        <NotificationContainer/>
      </div>
    );
  }
}

BorderWrapper.propTypes = {
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, {})(BorderWrapper);
