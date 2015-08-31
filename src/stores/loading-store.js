import {EventEmitter} from 'events';

const LOADING_STATE = 'loading';
const LOADED_STATE = 'loaded';
const CHANGE_EVENT = 'change';

const LOADED_ACTION = 'LOADED';

class LoadingStore extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.state = LOADING_STATE;

    let self = this;
    dispatcher.register(function(action) {
      switch(action.type) {
        case LOADED_ACTION:
          self.updateState(LOADED_STATE);
          self.emitChange();
          break;
      }
    });
  }
  getState() {
    return this.state;
  }
  updateState(newState) {
    this.state = newState;
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}
LoadingStore.LOADING = LOADING_STATE;
LoadingStore.LOADED = LOADED_STATE;
LoadingStore.CHANGE_EVENT = CHANGE_EVENT;

export default LoadingStore;
