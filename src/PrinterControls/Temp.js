import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button} from 'react-materialize';
import { connect } from 'react-redux';

import { setBedTemp } from '../actions/printerActions';

class Temp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localTargetToolTemp: null,
      localTargetBedTemp: null
    }
  }

  onChangeBed(e) {

    this.setState({
      'localTargetBedTemp': e.target.value
    })
  }

  onChangeToolhead(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderBedTemps() {
    let that = this;
    // if (this.props.bedTempTarget) {
    //   return (
    //     { that.props.bedTemp } | { that.props.bedTempTarget}
    //   )
    // } else {
    //   return (
    //     { that.props.bedTemp }
    //   )
    // }

  }

  render() {
    return(
      <div>
        <Row>
          <Col s={6}>
           { this.props.bedTemp } | { this.props.bedTempTarget}
          </Col>
          <Col s={6}>
            <label> Bed Temp: </label>
            <input type="text" name="localTargetBedTemp" value={this.props.bedTempTarget} onChange={this.onChangeBed}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bedTemp: state.printers.bedTemp,
  bedTempTarget: state.printers.bedTempTarget,
  toolTemp: state.printers.toolTemp,
  toolTempTarget: state.printers.toolTempTarget
})

export default connect(mapStateToProps, {})(Temp);
