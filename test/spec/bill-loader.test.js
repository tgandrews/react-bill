import BillLoader from '../../src/bill-loader';

describe('Bill loader', () => {
  it('should exist', () => {
    expect(BillLoader).toBeDefined();
  });

  describe('#load', () => {
    beforeEach(() => {
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    const URL = 'https://still-scrubland-9880.herokuapp.com/bill.json';

    it('should make a call to data server', () => {
      BillLoader.load();

      expect(jasmine.Ajax.requests.mostRecent().url).toBe(URL);
    });

    it('should call createSuccess on the action with data from the response on the action passed when successful', (done) => {
      const EXPECTED_DATA = { hello: 'world' };

      let MockAction = jasmine.createSpyObj('Action', [ 'createSuccess' ]);

      jasmine.Ajax.stubRequest(URL).andReturn({ responseText: JSON.stringify(EXPECTED_DATA) });

      BillLoader
        .load(MockAction)
        .then(() => {
          expect(MockAction.createSuccess).toHaveBeenCalledWith(EXPECTED_DATA);
          done();
        })
        .catch(done.fail);
    });

    it('should call createError on the action when there is an unsuccesful response code', (done) => {
      let MockAction = jasmine.createSpyObj('Action', [ 'createError' ]);

      jasmine.Ajax.stubRequest(URL).andReturn({ status: 500, responseText: '' });

      BillLoader
        .load(MockAction)
        .then(() => {
          expect(MockAction.createError).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should not call create if there is invalid JSON in the response', (done) => {
      let MockAction = jasmine.createSpyObj('Action', [ 'createError' ]);

      jasmine.Ajax.stubRequest(URL).andReturn({ status: 200, responseText: 'uglybugglybug }' });

      BillLoader
        .load(MockAction)
        .then(() => {
          expect(MockAction.createError).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });
  });

});
