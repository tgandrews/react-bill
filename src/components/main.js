'use strict';

import React from 'react';
import Dispatcher from '../dispatcher/dispatcher';

import BillLoaderAction from '../actions/bill-loader-action';
import BillLoader from '../bill-loader';

import LoadingStore from '../stores/loading-store';
import SummaryStore from '../stores/summary-store';

import App from './App';

let stores = {
  loading: new LoadingStore(Dispatcher),
  summary: new SummaryStore(Dispatcher)
};

let action = new BillLoaderAction(Dispatcher);
BillLoader.load(action);

let content = document.getElementById('content');
React.render(<App stores={stores} />, content);
