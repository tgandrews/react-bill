import BillLoaderAction from '../../../src/actions/bill-loader-action';

describe('Bill loader', () => {

  it('should exist', () => {
    expect(BillLoaderAction).toBeDefined();
  });

  it('should dispatch a loaded event when createSuccess called', (done) => {
    const EXPECTED = {};
    let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'dispatch' ]);

    MockDispatcher.dispatch.and.callFake((action) => {
      expect(action.type).toBe('LOADED');
      expect(action.value).toBe(EXPECTED);
      done();
    });

    let loaderAction = new BillLoaderAction(MockDispatcher);
    loaderAction.createSuccess(EXPECTED);
  });

  it('should dispatch a loaded failed event when createError called', (done) => {
    const EXPECTED = {};
    let MockDispatcher = jasmine.createSpyObj('dispatcher', [ 'dispatch' ]);

    MockDispatcher.dispatch.and.callFake((action) => {
      expect(action.type).toBe('LOAD_FAILED');
      expect(action.value).toBe(EXPECTED);
      done();
    });

    let loaderAction = new BillLoaderAction(MockDispatcher);
    loaderAction.createError(EXPECTED);
  });
});
