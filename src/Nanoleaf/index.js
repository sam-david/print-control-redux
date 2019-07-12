import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

class Nanoleaf extends Component {
  render() {
    return(
      <div>
        Nanoleaf
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(Nanoleaf);
