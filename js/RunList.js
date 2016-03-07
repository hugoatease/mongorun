var React = require('react');
var request = require('superagent');

var RunList = React.createClass({
    getDefaultProps: function() {
        return {
            profile_id: null
        }
    },

    getInitialState: function() {
        return {
            runs: []
        }
    },

    componentWillReceiveProps: function(props) {
       this.fetch(props.profile_id);
    },

    fetch: function(profile_id) {
        var url = '/api/runs';
        if (profile_id) {
            url = '/api/profiles/' + profile_id + '/runs';
        }

        request.get(url)
            .end(function(err, res) {
                if (err) return;
                this.setState({
                    runs: res.body
                });
            }.bind(this));
    },

    componentDidMount: function() {
        this.fetch(this.props.profile_id);
    },

    render: function() {
        return (
            <ul className="list-group">
                {this.state.runs.map(function(run) {
                    return (
                        <li className="list-group-item">{run['_id']} - {run.duration} - {run.kilometers}km</li>
                    )
                })}
            </ul>
        )
    }
});

module.exports = RunList;