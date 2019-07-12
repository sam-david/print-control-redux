import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

class Extrude extends Component {
  render() {
    return(
      <div>
        Extrude
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(Extrude);
