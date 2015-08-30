'use strict';

var SkyBillApp = require('./SkyBillApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={SkyBillApp}>
    <Route name="/" handler={SkyBillApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
