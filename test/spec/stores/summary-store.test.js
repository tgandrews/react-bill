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

  describe('#getPeriod', () => {
    it('should default to null', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let store = new SummaryStore(MockDispatcher);
      expect(store.getPeriod()).toEqual({ to: null, from: null });
    });

    it('should update the period to be valid date objects', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getPeriod().from).toEqual(new Date('2014-01-01'));
        expect(store.getPeriod().to).toEqual(new Date('2015-01-01'));
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            period: {
              from: '2014-01-01',
              to: '2015-01-01'
            }
          }
        }
      });
    });

    it('should be null if there is no period provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getPeriod().from).toBe(null);
        expect(store.getPeriod().to).toBe(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
          }
        }
      });
    });

    it('should be null if the date is invalid', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getPeriod().from).toBe(null);
        expect(store.getPeriod().to).toBe(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            period: {
              from: 'not a date',
              to: 'definitely not a date'
            }
          }
        }
      });
    });
  });

  describe('#getGenerated', () => {
    it('should be null by default', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let store = new SummaryStore(MockDispatcher);
      expect(store.getGenerated()).toEqual(null);
    });

    it('should be a valid date when provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getGenerated()).toEqual(new Date('2015-05-12'));
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            generated: '2015-05-12'
          }
        }
      });
    });

    it('should null when there is no value provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getGenerated()).toEqual(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
          }
        }
      });
    });

    it('should null when there is an invalid value provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getGenerated()).toEqual(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            generated: 'I aint a date'
          }
        }
      });
    });
  });

  describe('#getDue', () => {
    it('should be null by default', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      let store = new SummaryStore(MockDispatcher);
      expect(store.getDue()).toEqual(null);
    });

    it('should be a valid date when provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getDue()).toEqual(new Date('2015-05-12'));
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            due: '2015-05-12'
          }
        }
      });
    });

    it('should null when there is no value provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getDue()).toEqual(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
          }
        }
      });
    });

    it('should null when there is an invalid value provided', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new SummaryStore(MockDispatcher);

      store.on(SummaryStore.CHANGE_EVENT, () => {
        expect(store.getDue()).toEqual(null);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          statement: {
            due: 'I aint a date'
          }
        }
      });
    });
  });
});
