import React from 'react';

function padTwoDigits(num) {
  if (num < 10) {
    return '0' + num;
  }
  else {
    return '' + num;
  }
}

function renderDate(date) {
  if (!date) {
    return '';
  }

  let day = padTwoDigits(date.getDate());
  let month = padTwoDigits(date.getMonth() + 1);
  let decadeYear = parseInt(date.getFullYear().toString().slice(2));
  let year = padTwoDigits(decadeYear);

  return `${day}/${month}/${year}`;
}

function renderMoney(value) {
  if (typeof value !== 'number') {
    return '';
  }

  return '£' + value.toFixed(2);
}

let Summary = React.createClass({
  getInitialState: function () {
    return this._getStateFromStore();
  },
  _getStateFromStore: function () {
    return {
      hasLoaded: this.props.store.hasLoaded(),
      total: this.props.store.getTotal(),
      due: this.props.store.getDue()
    };
  },
  componentDidMount: function () {
    this.props.store.addChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState(this._getStateFromStore());
  },
  render: function () {
    let classes = [ 'summary' ];
    if (!this.state.hasLoaded) {
      classes.push('loading');
    }
    return (
      <div className={classes.join(' ')}>
        <h2>Summary</h2>
        <span className='total'>
          <h3>Total</h3>
          {renderMoney(this.state.total)}
        </span>
        <span className='due'>
          <h3>Due</h3>
          {renderDate(this.state.due)}
        </span>
      </div>
    );
  }
});

export default Summary;
