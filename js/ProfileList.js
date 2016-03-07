var React = require('react');
var request = require('superagent');
var browserHistory = require('react-router').browserHistory;

var ProfileList = React.createClass({
    getInitialState: function() {
        return {
            profiles: []
        }
    },

    componentDidMount: function() {
        request.get('/api/profiles')
            .end(function(err, res) {
                if (err) return;
                this.setState({profiles: res.body});
            }.bind(this));
    },

    select: function(profile) {
        browserHistory.push('/profiles/' + profile['_id']);
    },

    render: function() {
        return (
            <ul className="list-group">
                {this.state.profiles.map(function(profile) {
                    return (
                        <li className="list-group-item" onClick={this.select.bind(this, profile)}>{profile.first_name} {profile.last_name}</li>
                    )
                }.bind(this))}
            </ul>
        );
    }
});

module.exports = ProfileList;