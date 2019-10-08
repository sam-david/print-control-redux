import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col} from 'react-materialize';
import { connect } from 'react-redux';

import Stream from '../Stream';

class StreamView extends Component {
  render() {
    return(
      <div>
        <Stream />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(StreamView);
