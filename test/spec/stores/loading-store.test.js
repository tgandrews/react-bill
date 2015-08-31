import {EventEmitter} from 'events';

import LoadingStore from '../../../src/stores/loading-store';

describe('Loading Store', () => {

  it('should exist', () => {
    expect(LoadingStore).toBeDefined();
  });

  it('should be an instance of EventEmitter', () => {
    let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
    let store = new LoadingStore(MockDispatcher);
    expect(store instanceof EventEmitter).toBe(true);
  });

  describe('#getState', () => {
    it('should default state to loading', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let store = new LoadingStore(MockDispatcher);
      expect(store.getState()).toBe(store.constructor.LOADING);
    });

    it('should update state to ready after receiving a loaded dispatch', (done) => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let callback;
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });
      let store = new LoadingStore(MockDispatcher);

      store.addChangeListener(() => {
        expect(store.getState()).toBe(LoadingStore.LOADED);
        done();
      });

      callback({
        'type': 'LOADED',
        'value': {}
      });
    });
  });
});
