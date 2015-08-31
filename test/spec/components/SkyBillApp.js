'use strict';
import React from 'react/addons';
import createComponent from '../../helpers/createComponent';

describe('SkyBillApp', () => {
  let SkyBillApp;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    // SkyBillApp = require('components/SkyBillApp.js');
  });

  xit('should create a new instance of SkyBillApp', () => {
    let component = React.createElement(SkyBillApp);
    expect(component).toBeDefined();
  });

  xit('should return a h1', () => {
    let result = createComponent(SkyBillApp);
    expect(result.type).toBe('h1');
  });
});
