var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;

var ProfileCreate = React.createClass({
    save: function(ev) {
        ev.preventDefault();
        var first_name = ReactDOM.findDOMNode(this.refs.first_name).value;
        var last_name = ReactDOM.findDOMNode(this.refs.last_name).value;
        var email = ReactDOM.findDOMNode(this.refs.email).value;

        request.post('/api/profiles')
            .send({
                first_name: first_name,
                last_name: last_name,
                email: email
            })
            .end(function(err, res) {
                if (err) return;
                browserHistory.push('/profiles/' + res.body['_id']);
            }.bind(this));
    },

    render: function() {
        return (
            <form onClick={this.save}>
                <div className="form-group">
                    <label for="first_name">First name</label>
                    <input type="text" className="form-control" id="first_name" ref="first_name" placeholder="First name" />
                </div>
                <div className="form-group">
                    <label for="last_name">Last name</label>
                    <input type="text" className="form-control" id="last_name" ref="last_name" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="text" className="form-control" id="email" ref="email" placeholder="Email" />
                </div>
                <button type="submit" className="btn btn-success">Save profile</button>
            </form>
        );
    }
});

module.exports = ProfileCreate;