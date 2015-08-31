import {EventEmitter} from 'events';

import Dispatcher from '../dispatcher/dispatcher';

const LOADING_STATE = 'loading';
const LOADED_STATE = 'loaded';
const CHANGE_EVENT = 'change';

const LOADED_ACTION = 'LOADED';

class LoadingStore extends EventEmitter {
  constructor() {
    super();
    this.state = LOADING_STATE;
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

let loadingStore = new LoadingStore();

Dispatcher.register(function(action) {
  switch(action.type) {
    case LOADED_ACTION:
      loadingStore.updateState(LOADED_STATE);
      loadingStore.emitChange();
      break;
  }
});

export default loadingStore;
