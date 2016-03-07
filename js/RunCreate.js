var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;

var RunCreate = React.createClass({
    save: function(ev) {
        ev.preventDefault();
        var duration = ReactDOM.findDOMNode(this.refs.duration).value;
        var kilometers = ReactDOM.findDOMNode(this.refs.kilometers).value;

        request.post('/api/runs')
            .send({
                profile_id: this.props.params.profile_id,
                duration: duration,
                kilometers: kilometers
            })
            .end(function(err, res) {
                if (err) return;
                browserHistory.push('/profiles/' + this.props.params.profile_id);
            }.bind(this));
    },

    render: function() {
        return (
            <form onSubmit={this.save}>
                <div className="form-group">
                    <label for="duration">Duration</label>
                    <input type="text" className="form-control" id="duration" ref="duration" placeholder="Duration" />
                </div>
                <div className="form-group">
                    <label for="kilometers">Kilometers</label>
                    <input type="text" className="form-control" id="kilometers" ref="kilometers" placeholder="Kilometers" />
                </div>
                <button type="submit" className="btn btn-success">Save run</button>
            </form>
        );
    }
});

module.exports = RunCreate;