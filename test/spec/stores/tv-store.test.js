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
  });
});
