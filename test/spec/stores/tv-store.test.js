import {EventEmitter} from 'events';
import TVStore from '../../../src/stores/tv-store';

describe('TV store', () => {
  it('should exist', () => {
    expect(TVStore).toBeDefined();
  });

  it('should be an EventEmitter', () => {
    let MockDispatcher = jasmine.createSpyObj('dispatcher', ['register']);
    let store = new TVStore(MockDispatcher);
    expect(store instanceof EventEmitter).toBe(true);
  });

  describe('#getTotal', () => {
    it('should default to null', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', ['register']);
      let store = new TVStore(MockDispatcher);
      expect(store.getTotal()).toBe(null);
    });

    it('should retrieve the value from the subscription when the data is received', (done) => {
      const EXPECTED_TOTAL = 1234.23;
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new TVStore(MockDispatcher);

      store.on(TVStore.CHANGE_EVENT, () => {
        expect(store.getTotal()).toBe(EXPECTED_TOTAL);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          package: {
            subscriptions: [
              {
                type: 'tv',
                total: EXPECTED_TOTAL
              }
            ]
          }
        }
      });
    });

    it('should be null when the total is not valid', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new TVStore(MockDispatcher);

      let notValidValues = [ 'not a number', NaN, Infinity, -1, {}, null, undefined ];
      let callbackCount = 0;
      store.on(TVStore.CHANGE_EVENT, () => {
        callbackCount++;
        expect(store.getTotal()).toBe(null);
        if (callbackCount === notValidValues.length) {
          done();
        }
      });

      for (let i = 0; i < notValidValues.length; ++i) {
        let value = notValidValues[i];
        callback({
          type: 'LOADED',
          value: {
            package: {
              subscriptions: [
                {
                  type: 'tv',
                  total: value
                }
              ]
            }
          }
        });
      }
    });
  });

  describe('#getPackage', () => {
    it('should default to null', () => {
      let MockDispatcher = jasmine.createSpyObj('dispatcher', ['register']);
      let store = new TVStore(MockDispatcher);
      expect(store.getPackage()).toBe(null);
    });

    it('should retrieve the value from the subscription', (done) => {
      const EXPECTED_PACKAGE = 'some package name';
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new TVStore(MockDispatcher);

      store.on(TVStore.CHANGE_EVENT, () => {
        expect(store.getPackage()).toBe(EXPECTED_PACKAGE);
        done();
      });

      callback({
        type: 'LOADED',
        value: {
          package: {
            subscriptions: [
              {
                type: 'tv',
                package: EXPECTED_PACKAGE
              }
            ]
          }
        }
      });
    });

    it('should set to null when an invalid value is passed', (done) => {
      let callback;
      let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'register' ]);
      MockDispatcher.register.and.callFake((cb) => {
        callback = cb;
      });

      let store = new TVStore(MockDispatcher);

      let notValidValues = [ NaN, Infinity, -1, {}, null, undefined ];
      let callbackCount = 0;
      store.on(TVStore.CHANGE_EVENT, () => {
        callbackCount++;
        expect(store.getPackage()).toBe(null);
        if (callbackCount === notValidValues.length) {
          done();
        }
      });

      for (let i = 0; i < notValidValues.length; ++i) {
        let value = notValidValues[i];
        callback({
          type: 'LOADED',
          value: {
            package: {
              subscriptions: [
                {
                  type: 'tv',
                  package: value
                }
              ]
            }
          }
        });
      }
    });
  });
});
