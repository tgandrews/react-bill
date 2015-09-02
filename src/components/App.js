'use strict';

import React from 'react';

import Summary from './Summary';

function getStateFromStores(stores) {
  return {
    loaded: stores.loading.getState()
  };
}

let App = React.createClass({
  getInitialState: function () {
    return getStateFromStores(this.props.stores);
  },
  componentDidMount: function () {
    this.props.stores.loading.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.props.stores.loading.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState(getStateFromStores(this.props.stores));
  },
  render: function() {
    let summary = '';
    if (this.state.loaded === 'loaded') {
      summary = (<Summary store={this.props.stores.summary}/>);
    }

    return (
      <div>
        <h1>Hello world</h1>
        <h1>{ this.state.loaded }</h1>
        {summary}
      </div>
    );
  }
});

export default App;
