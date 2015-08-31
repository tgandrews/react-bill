import {EventEmitter} from 'events';
import 'array.prototype.find';

const CHANGE_EVENT = 'change';

const LOADED_ACTION = 'LOADED';

class TVStore extends EventEmitter {
  constructor(dispatcher) {
    super();

    this._total = null;

    let self = this;
    dispatcher.register((action) => {
      switch(action.type) {
        case LOADED_ACTION:
          let data = action.value;
          let subscriptions = (data.package && data.package.subscriptions) || [];
          let tvSubscription = subscriptions.find((sub) => {
            return sub.type === 'tv';
          }) || {};
          self.setTotal(tvSubscription.total);
          // self.setPackage();
          self.emitChange();
          break;
      }
    });
  }
  getTotal(){
    return this._total;
  }
  setTotal(total) {
    this._total = total;
  }

  getPackage() {
  }
  // setPackage(pkg) {
  // }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}
TVStore.CHANGE_EVENT = CHANGE_EVENT;

export default TVStore;
