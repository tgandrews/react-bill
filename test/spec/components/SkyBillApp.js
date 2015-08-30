'use strict';

describe('SkyBillApp', () => {
  let React = require('react/addons');
  let SkyBillApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    SkyBillApp = require('components/SkyBillApp.js');
    component = React.createElement(SkyBillApp);
  });

  it('should create a new instance of SkyBillApp', () => {
    expect(component).toBeDefined();
  });
});
