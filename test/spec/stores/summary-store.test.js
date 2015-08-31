import {EventEmitter} from 'events';

import SummaryStore from '../../../src/stores/summary-store';

describe('Summary store', () => {

  it('should exist', () => {
    expect(SummaryStore).toBeDefined();
  });

  it('should be an instance of EventEmitter', () => {
    let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
    let store = new SummaryStore(MockDispatcher);
    expect(store instanceof EventEmitter).toBe(true);
  });

  describe('#getTotal', () => {

    it('should be null by default', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let store = new SummaryStore(MockDispatcher);
      expect(store.getTotal()).toBe(null);
    });

    it('should read total from the data object on a LOADED event and emit a change event', (done) => {
      const EXPECTED_TOTAL = 1234.23;
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(EXPECTED_TOTAL);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
          total: EXPECTED_TOTAL
        }
      });
    });

    it('should set the value back to null if the total is not there', (done) => {
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(null);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
        }
      });
    });

    it('should set the total to null if the value is not a number', (done) => {
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(null);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
          total: 'Crazy value'
        }
      });
    });

    it('should set the total to null if the value is not a finite number', (done) => {
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(null);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
          total: Infinity
        }
      });
    });

    it('should allow for a 0 value bill as people may be given discounts', (done) => {
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(0);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
          total: 0
        }
      });
    });

    it('should not allow for negative value bills - we can\'t run a businss like that!', (done) => {
      let callbacks = [];
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callbacks.push(cb);
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(null);
        done();
      });

      callbacks[0]({
        type: 'LOADED',
        value: {
          total: -10
        }
      });
    });
  });
});
