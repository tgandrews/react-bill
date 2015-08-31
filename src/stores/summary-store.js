import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';
const LOADED_ACTION = 'LOADED';

function isValidTotal(value) {
  return (typeof value) === 'number'
    && isFinite(value)
    && value >= 0;
}

function getDateOrNull(value) {
  let date = new Date(value);
  if (isNaN(date.getDate())){
    date = null;
  }
  return date;
}

class SummaryStore extends EventEmitter {
  constructor (dispatcher) {
    super();
    this._total = null;
    this._period = {to: null, from: null};
    this._generated = null;
    this._due = null;

    self = this;
    dispatcher.register((action) => {
      switch(action.type) {
        case LOADED_ACTION:
          self.setTotal(action.value);

          let period = action.value && action.value.statement && action.value.statement.period;
          self.setPeriod(period);

          let generated = action.value && action.value.statement && action.value.statement.generated;
          self.setGenerated(generated);

          let due = action.value && action.value.statement && action.value.statement.due;
          self.setDue(due);

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
    period = period || {};
    this._period = {
      from: getDateOrNull(period.from),
      to: getDateOrNull(period.to)
    };
  }

  getGenerated() {
    return this._generated;
  }
  setGenerated(generated) {
    this._generated = getDateOrNull(generated);
  }

  getDue() {
    return this._due;
  }
  setDue(due) {
    this._due = getDateOrNull(due);
  }
}
SummaryStore.CHANGE_EVENT = CHANGE_EVENT;

export default SummaryStore;
