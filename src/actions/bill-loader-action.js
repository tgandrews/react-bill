class BillLoaderAction {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }
  createSuccess (value) {
    this._dispatcher.dispatch({
      type: 'LOADED',
      value: value
    });
  }
  createError (error) {
    this._dispatcher.dispatch({
      type: 'LOAD_FAILED',
      value: error
    });
  }
}

export default BillLoaderAction;
