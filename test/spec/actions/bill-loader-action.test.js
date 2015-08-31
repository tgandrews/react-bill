import BillLoaderAction from '../../../src/actions/bill-loader-action';
import Dispatcher from '../../../src/dispatcher/dispatcher';

describe('Bill loader', () => {

  let originalDispatch = Dispatcher.dispatch;
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = jasmine.createSpy(Dispatcher.dispatch);
    Dispatcher.dispatch = dispatcherSpy;
  });
  afterEach(() => {
    Dispatcher.dispatch = originalDispatch;
  });

  it('should exist', () => {
    expect(BillLoaderAction).toBeDefined();
  });

  it('should dispatch a loaded event when createSuccess called', (done) => {
    const EXPECTED = {};

    dispatcherSpy.and.callFake((action) => {
      expect(action.type).toBe('LOADED');
      expect(action.value).toBe(EXPECTED);
      done();
    });

    BillLoaderAction.createSuccess(EXPECTED);
  });

  it('should dispatch a loaded failed event when createError called', (done) => {
    const EXPECTED = {};

    dispatcherSpy.and.callFake((action) => {
      expect(action.type).toBe('LOAD_FAILED');
      expect(action.value).toBe(EXPECTED);
      done();
    });

    BillLoaderAction.createError(EXPECTED);
  });
});
