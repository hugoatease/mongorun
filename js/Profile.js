var React = require('react');
var request = require('superagent');
var RunList = require('./RunList');
var Link = require('react-router').Link;

var Profile = React.createClass({
    getInitialState: function() {
        return {
            '_id': null,
            first_name: null,
            last_name: null,
            email: null,
            avatar: null
        }
    },

    componentDidMount: function() {
        request.get('/api/profiles/' + this.props.params.profile_id)
            .end(function(err, res) {
                if (err) return;
                this.setState(res.body);
            }.bind(this));
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <img src={this.state.avatar} />
                    <h3>{this.state.first_name} {this.state.last_name}</h3>
                    <h4>{this.state.email}</h4>
                </div>
                <div className="col-md-6">
                    <h3>Runs</h3>
                    <RunList profile_id={this.state['_id']} />
                    <Link to={'/profiles/' + this.props.params.profile_id + '/runs/create'}><button className="btn btn-success"> Create run</button></Link>
                </div>
            </div>
        );
    }
});

module.exports = Profile;