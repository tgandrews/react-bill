// import createComponent from '../../helpers/createComponent';
// import React from 'react';
import React from 'react/addons';
import Summary from '../../../src/components/Summary';
let TestUtils = React.addons.TestUtils;

describe('Summary component', () => {
  let MockSummaryStore;
  beforeEach(() => {
    MockSummaryStore = jasmine.createSpyObj('SummaryStore', [ 'getTotal', 'getDue' ]);
    MockSummaryStore.getTotal.and.returnValue(1);
    MockSummaryStore.getDue.and.returnValue(new Date());
  });

  it('should exist', () => {
    expect(Summary).toBeDefined();
  });

  it('should be a div with a class name of summary', () => {
    let renderedTree = TestUtils.renderIntoDocument(<Summary store={MockSummaryStore}/>);

    let component = TestUtils.findRenderedDOMComponentWithClass(renderedTree, 'summary');
    expect(component).toBeDefined();
  });

  it('should show the total from the SummaryStore', () => {
    MockSummaryStore.getTotal.and.returnValue(123);

    let renderedTree = TestUtils.renderIntoDocument(<Summary store={MockSummaryStore} />);
    let component = TestUtils.findRenderedDOMComponentWithClass(renderedTree, 'total');
    expect(component.getDOMNode().textContent).toBe('Total£123.00');
  });

  it('should show the due date', () => {
    MockSummaryStore.getDue.and.returnValue(new Date('12 May 2015'));
    let renderedTree = TestUtils.renderIntoDocument(<Summary store={MockSummaryStore} />);
    let component = TestUtils.findRenderedDOMComponentWithClass(renderedTree, 'due');
    expect(component.getDOMNode().textContent).toBe('Due12/05/15');
  });
});
