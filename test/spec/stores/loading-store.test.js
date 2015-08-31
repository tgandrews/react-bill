import {EventEmitter} from 'events';

import Dispatcher from '../../../src/dispatcher/dispatcher';
import LoadingStore from '../../../src/stores/loading-store';

describe('Loading Store', () => {

  it('should exist', () => {
    expect(LoadingStore).toBeDefined();
  });

  it('should be an instance of EventEmitter', () => {
    expect(LoadingStore instanceof EventEmitter).toBe(true);
  });

  describe('#getState', () => {
    it('should default state to loading', () => {
      expect(LoadingStore.getState()).toBe(LoadingStore.constructor.LOADING);
    });

    it('should update state to ready after receiving a loaded dispatch', (done) => {
      LoadingStore.on(LoadingStore.constructor.CHANGE_EVENT, () => {
        expect(LoadingStore.getState()).toBe(LoadingStore.constructor.LOADED);
        done();
      });

      Dispatcher.dispatch({
        'type': 'LOADED',
        'value': {}
      });
    });
  });
});
