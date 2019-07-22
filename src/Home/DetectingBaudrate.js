import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Preloader } from 'react-materialize';
import { connect } from 'react-redux';

class DetectingBaudrate extends Component {
  render() {
    return(
      <div className="detecting-container">
        <Col s={12}>
          <h1>Detecting Baudrate...</h1>
          <Preloader flashing />
        </Col>
      </div>
    )
  }
}

export default connect(null, { })(DetectingBaudrate);
