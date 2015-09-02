// import createComponent from '../../helpers/createComponent';
// import React from 'react';
import React from 'react/addons';
import Summary from '../../../src/components/Summary';
let TestUtils = React.addons.TestUtils;

describe('Summary component', () => {
  it('should exist', () => {
    expect(Summary).toBeDefined();
  });

  it('should be a div with a class name of summary', () => {
    let renderedTree = TestUtils.renderIntoDocument(<Summary />);

    let component = TestUtils.findRenderedDOMComponentWithClass(renderedTree, 'summary');
    expect(component.getDOMNode().tagName).toBe('DIV');
  });
});
