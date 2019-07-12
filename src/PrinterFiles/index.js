import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Collapsible, CollapsibleItem, Dropdown, Divider, Icon, Button, Modal} from 'react-materialize';
import { connect } from 'react-redux';

class Files extends Component {

  render() {
    return(
      <Collapsible>
        <CollapsibleItem header="Better safe than sorry. That's my motto." icon="filter_drama">
        Better safe than sorry. That's my motto.
        </CollapsibleItem>
        <CollapsibleItem header="Yeah, you do seem to have a little 'shit creek' ac…" icon="place">
        Yeah, you do seem to have a little 'shit creek' action going.
        </CollapsibleItem>
        <CollapsibleItem header="You know, FYI, you can buy a paddle. Did you not p…" icon="whatshot">
        You know, FYI, you can buy a paddle. Did you not plan for this contingency?
        </CollapsibleItem>
      </Collapsible>
    )
  }
}

const mapStateToProps = state => ({
  selectedPage: state.nav.selectedPage
})

export default connect(mapStateToProps, {})(Files);
