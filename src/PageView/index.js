import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PrinterSelect from '../PrinterSelect';
import PrinterControls from '../PrinterControls';
import PrinterFiles from '../PrinterFiles';
import StreamView from '../StreamView';
import Home from '../Home';

class PageView extends Component {
  render() {
    if (this.props.selectedPage == 'PrinterControls') {
      return (<PrinterControls />);
    } else if (this.props.selectedPage == 'PrinterSelect') {
      return (<PrinterSelect />);
    } else if (this.props.selectedPage == 'Home') {
      return (<Home />);
    } else if (this.props.selectedPage == 'PrinterFiles') {
      return (<PrinterFiles />);
    } else if (this.props.selectedPage == 'StreamView') {
      return (<StreamView />);
    } else {
      return (
        <div />
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(PageView);
