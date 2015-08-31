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

    self = this;
    dispatcher.register((action) => {
      switch(action.type) {
        case LOADED_ACTION:
          self.setTotal(action.value);
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
}
SummaryStore.CHANGE_EVENT = CHANGE_EVENT;

export default SummaryStore;
