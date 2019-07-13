import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Collapsible, CollapsibleItem, Dropdown, Divider, Icon, Button, Modal} from 'react-materialize';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import './style.scss';

import mosaicLogo from '../images/Mosaic.png';

import { getFiles, selectAndPrintFile } from '../actions/printerActions';
import { filamentToGrams } from '../utilities/filament';

class Files extends Component {
  constructor(props) {
    super(props);

    this.renderFileButton = this.renderFileButton.bind(this);
  }

  componentWillMount() {
    this.props.getFiles(this.props.selectedPrinter);
  }

  sortedFiles() {
    if (this.props.files) {
      return this.props.files.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    } else {
      return []
    }
  }

  bytesToSize(bytes) {
    // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  parsePrintTime(time) {
    let seconds = Math.floor(time % 60);
    let hours = Math.floor((time / 60) / 60);
    let minutes = Math.floor(time / 60);
    let hourMinutes = Math.floor((time / 60) - (hours * 60))
    if (hours > 0) {
      return hours + " hours " + hourMinutes + " min. ";
    } else {
      return minutes + " min.";
    }
  }

  estimatedPrintTime(file) {
    if(file.hasOwnProperty('gcodeAnalysis') && file.gcodeAnalysis.estimatedPrintTime) {
      return (
        "| " + this.parsePrintTime(file.gcodeAnalysis.estimatedPrintTime)
      )
    }
  }

  renderFileGrams(file) {
    if (file.hasOwnProperty('gcodeAnalysis') && file.gcodeAnalysis.hasOwnProperty('filament') && file.gcodeAnalysis.filament.hasOwnProperty('tool0')) {
      let filamentLength = file.gcodeAnalysis.filament.tool0.length;
      let grams = filamentToGrams(filamentLength);
      return (
        grams.toFixed(2) + " g."
      )
    }
  }

  renderFileCost(file) {
    if (file.hasOwnProperty('gcodeAnalysis') && file.gcodeAnalysis.hasOwnProperty('filament') && file.gcodeAnalysis.filament.hasOwnProperty('tool0')) {
      let filamentLength = file.gcodeAnalysis.filament.tool0.length;
      let grams = filamentToGrams(filamentLength);
      let pricePerKilo = 30.00;
      let pricePerGram = pricePerKilo / 1000;
      let finalPrice = pricePerGram * grams;

      return (
        "$ " + finalPrice.toFixed(2)
      )
    }
  }

  renderFileButton(file) {
    if (this.props.printerStatus == 'Operational') {
      return <Button className="button" waves='light' onClick={() => this.props.selectAndPrintFile(this.props.selectedPrinter, file)}>Start</Button>
    }
  }

  renderPrintDimensions(file) {
    if (file.hasOwnProperty('gcodeAnalysis') && file.gcodeAnalysis.hasOwnProperty('dimensions')) {
      return (
        Math.round(file.gcodeAnalysis.dimensions.width) + "mm x " + Math.round(file.gcodeAnalysis.dimensions.depth) + "mm x " + Math.round(file.gcodeAnalysis.dimensions.height) + "mm"
      )
    }
  }

  renderFailIcon(file) {
    if (file.hasOwnProperty('prints') && file.prints.failure >= 1) {

      if (file.prints.hasOwnProperty('last') && file.prints.last.success == false) {
        return (
          <Row className="fail-icon-row">
            <Col s={12} className="fail-date-text">
              <Moment format="dd - MM/DD h:mm a">{file.prints.last.date * 1000}</Moment>
              <Button
                floating
                large
                className="red failed-jobs-button"
                waves="light"
              >
                <span>
                  {file.prints.failure}
                </span>
              </Button>
            </Col>
          </Row>
        )
      } else {
        return (
          <Button
            floating
            large
            className="red failed-jobs-button"
            waves="light"
          >
            <span>
              {file.prints.failure}
            </span>
          </Button>
        )
      }
      }
  }

  renderSuccessIcon(file) {
    if (file.hasOwnProperty('prints') && file.prints.success >= 1) {

      if (file.prints.hasOwnProperty('last') && file.prints.last.success == true) {
        return (
          <Row className="success-icon-row">
            <Col s={12} className="success-date-text">
              <Moment format="dd - MM/DD h:mm a">{file.prints.last.date * 1000}</Moment>
              <Button
                floating
                large
                className="green success-jobs-button"
                waves="light"
              >
                <span>
                  {file.prints.success}
                </span>
              </Button>
            </Col>
          </Row>
        )
      } else {
        return (
          <Button
            floating
            large
            className="green failed-jobs-button"
            waves="light"
          >
            <span>
              {file.prints.success}
            </span>
          </Button>
        )
      }
      }
  }

  render() {
    return(
      <Collapsible className="file-collapsible">
        {this.sortedFiles().slice(0,10).map((file, index) => (
            <CollapsibleItem key={index} header={file.name.replace('.gcode','').replace('.maf', '')}>
              <Row className="file-content-row">
                <Col s={4} className="file-name-date-column">
                  <span className="file-name">{file.name.substring(0, 35)} {file.name.includes('.maf') ? <img className='mosaic-logo' src={mosaicLogo} /> : '' }</span> <br />
                  <p className="file-date" >
                    <Moment format="dd - MM/DD">{file.date * 1000}</Moment> {this.estimatedPrintTime(file)} | {this.bytesToSize(file.size)}
                  </p>
                </Col>
                <Col s={4} className="file-size">
                  {this.renderSuccessIcon(file)}
                  {this.renderFailIcon(file)}
                </Col>
                <Col s={2} className="file-date">
                  {this.renderPrintDimensions(file)} <br />

                  {this.renderFileCost(file)} | {this.renderFileGrams(file)}
                </Col>
                <Col s={2}>
                  { this.renderFileButton(file) }
                </Col>
              </Row>
            </CollapsibleItem>
          ))}
      </Collapsible>
    )
  }
}

Files.propTypes = {
  selectedPrinter: PropTypes.string,
  getFiles: PropTypes.func,
  selectAndPrintFile: PropTypes.func
}

const mapStateToProps = state => ({
  selectedPrinter: state.printers.selectedPrinter,
  printerStatus: state.printers.printerStatus,
  files: state.printers.files
})

export default connect(mapStateToProps, { getFiles, selectAndPrintFile })(Files);
