import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter, streamUrl } from '../actions/printerActions';

import './style.scss';

class Stream extends Component {
  render() {
    return(
      <img src={this.props.streamUrl(this.props.selectedPrinter)} />
    )
  }
}

Stream.propTypes = {
  selectedPage: PropTypes.string,
  selectedPrinter: PropTypes.string
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage,
  selectedPrinter: state.printers.selectedPrinter
})

export default connect(mapStateToProps, {connectToPrinter, streamUrl})(Stream);
