var React = require('react')
var ConfirmBattle = require('../components/ConfirmBattle')
var githubHelpers = require('../utils/githubHelpers')

var ConfirmBattleContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			isLoading: true,
			playersInfo: []
		}
	},
	componentDidMount: function() {
		var query = this.props.location.query
		// console.log('QUERY', query)
		// console.log(this.props.location)
		// console.log(this.props)

		// fetch info from github then update the state
		githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
		.then(function(players) {
			// console.log('PLAYERS', players)
			this.setState({
				isLoading: false,
				playersInfo: [players[0], players[1]]
			})
		}.bind(this)) // bind(this) forces this on line 25 to refer to the same this as line 16
	},
	handleInitiateBattle: function() {
		this.context.router.push({
			pathname: '/results',
			state: { // sends the playersInfo array to new route
				playerInfo: this.state.playersInfo
			}
		})
	},
	render: function() {
		return (
			<ConfirmBattle 
				isLoading={this.state.isLoading}
				onInitiateBattle={this.handleInitiateBattle}
				playersInfo={this.state.playersInfo} />
		)
	}
})

module.exports = ConfirmBattleContainer