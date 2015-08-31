import Dispatcher from '../dispatcher/dispatcher';

export default {
  createSuccess: (value) => {
    Dispatcher.dispatch({
      type: 'LOADED',
      value: value
    });
  },

  createError: (error) => {
    Dispatcher.dispatch({
      type: 'LOAD_FAILED',
      value: error
    });
  }
};
