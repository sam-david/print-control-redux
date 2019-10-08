import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';

import { connectToPrinter } from '../actions/printerActions';
import { printerOctoCredentials } from '../utilities/printerCredentials';

import './style.scss';

class Stream extends Component {
  streamUrl(printer) {
    return printerOctoCredentials(printer).url + "/webcam/?action=stream"
  }

  render() {
    if (this.props.selectedPrinter != 'ender') {
      return(
        <img className="stream-image" src={this.streamUrl(this.props.selectedPrinter)} />
      )
    } else {
      return(
        <div />
      )
    }
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

export default connect(mapStateToProps, {connectToPrinter})(Stream);
