var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var ProfileList = require('./ProfileList');
var RunList = require('./RunList');
var Profile = require('./Profile');
var ProfileCreate = require('./ProfileCreate');
var RunCreate = require('./RunCreate');

var App = React.createClass({
   render: function() {
       return (
           <div className="container">
               <div className="page-header">
                   <h1>Mongorun</h1>
               </div>
               {this.props.children}
           </div>
       );
   }
});

var Index = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3>Profiles</h3>
                    <ProfileList />
                </div>
                <div className="col-md-6">
                    <h3>Runs</h3>
                    <RunList />
                </div>
            </div>
        );
    }
});

module.exports = function(container, props) {
    ReactDOM.render((
        <Router history={browserHistory} {...props}>
            <Route path="/" component={App}>
                <IndexRoute component={Index} />
                <Route path="/profiles/create" component={ProfileCreate} />
                <Route path="/profiles/:profile_id" component={Profile} />
                <Route path="/profiles/:profile_id/runs/create" component={RunCreate} />
            </Route>
        </Router>
    ), container);
}