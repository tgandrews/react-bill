import {EventEmitter} from 'events';
import 'array.prototype.find';
import {isValidTotal} from './utils';

const CHANGE_EVENT = 'change';

const LOADED_ACTION = 'LOADED';

class TVStore extends EventEmitter {
  constructor(dispatcher) {
    super();

    this._total = null;
    this._package = null;
    this._hasSubscription = false;

    let self = this;
    dispatcher.register((action) => {
      switch(action.type) {
        case LOADED_ACTION:
          let data = action.value;

          let subscriptions = (data.package && data.package.subscriptions) || [];
          let tvSubscription = subscriptions.find((sub) => {
            return sub.type === 'tv';
          });
          if (tvSubscription) {
            self.setHasSubscription();
          }
          tvSubscription = tvSubscription || {};

          self.setTotal(tvSubscription.total);
          self.setPackage(tvSubscription.package);
          self.emitChange();
          break;
      }
    });
  }
  getTotal(){
    return this._total;
  }
  setTotal(total) {
    if (!isValidTotal(total)) {
      total = null;
    }
    this._total = total;
  }

  getPackage() {
    return this._package;
  }
  setPackage(pkg) {
    if (typeof pkg !== 'string') {
      pkg = null;
    }
    this._package = pkg;
  }

  hasSubscription() {
    return this._hasSubscription;
  }
  setHasSubscription() {
    this._hasSubscription = true;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}
TVStore.CHANGE_EVENT = CHANGE_EVENT;

export default TVStore;
