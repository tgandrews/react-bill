import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
const LOADED_ACTION = 'LOADED';

function isValidTotal(value) {
  return (typeof value) === 'number'
    && isFinite(value)
    && value >= 0;
}

class SummaryStore extends EventEmitter {
  constructor (dispatcher) {
    super();
    this._total = null;
    this._period = {to: null, from: null};

    self = this;
    dispatcher.register((action) => {
      switch(action.type) {
        case LOADED_ACTION:
          self.setTotal(action.value);

          let period = action.value && action.value.statement && action.value.statement.period;
          self.setPeriod(period);

          self.emitChange();
          break;
      }
    });
  }
  emitChange () {
    this.emit(CHANGE_EVENT);
  }

  getTotal() {
    return this._total;
  }
  setTotal(json) {
    if (json && isValidTotal(json.total)) {
      this._total = json.total;
    }
    else {
      this._total = null;
    }
  }

  getPeriod() {
    return this._period;
  }
  setPeriod(period) {
    let fromDate = null;
    let toDate = null;
    if (period) {
      fromDate = new Date(period.from);
      toDate = new Date(period.to);

      if (isNaN(fromDate.getDate())) {
        fromDate = null;
      }
      if (isNaN(toDate.getDate())) {
        toDate = null;
      }
    }
    this._period = {
      from: fromDate,
      to: toDate
    };
  }
}
SummaryStore.CHANGE_EVENT = CHANGE_EVENT;

export default SummaryStore;
