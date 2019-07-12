import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

import Jog from './Jog';
import Extrude from './Extrude';
import Temp from './Temp';

class PrinterControls extends Component {
  render() {
    return(
      <div>
        PrinterControls
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(PrinterControls);
