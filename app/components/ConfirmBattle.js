var React = require('react')
var PropTypes = React.PropTypes
var styles = require('../styles')
var Link = require('react-router').Link

function puke(obj) {
	return <pre>{JSON.stringify(obj, null, ' ')}</pre>
} // used to print all the props to the front page

var ConfirmBattle = React.createClass({
	propTypes: {
		isLoading: PropTypes.bool.isRequired,
		playersInfo: PropTypes.array.isRequired,
		onInitiateBattle: PropTypes.func.isRequired

	},
	render: function() {
		return this.props.isLoading === true
			? <p> LOADING! </p>
			// : <div> CONFIRM BATTLE!: {puke(this.props)} </div>
			:	<div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
					<h1>Confirm Players</h1>
					<div className="col-sm-8 col-sm-offset-2">
						<div className="col-sm-6">
							<p className="lead">Player 1</p>
							PLAYER 1 INFO
							{puke(this.props.playersInfo[0])}
						</div>
						<div className="col-sm-6">
							<p className="lead">Player 2</p>
							PLAYER 2 INFO
							{puke(this.props.playersInfo[1])}
						</div>
					</div>
					<div className="col-sm-8 col-sm-offset-2">
						<div className="col-sm-12" style={styles.space}>
							<button type='button' className="btn btn-lg btn-success" onClick={this.props.onInitiateBattle}>
								INITIATE BATTLE
							</button>
						</div>
						<div className="col-sm-12" style={styles.space}>
							<Link to='/playerOne'>
								<button type='button' className="btn btn-lg btn-danger">Reselect Players</button>
							</Link>
						</div>
					</div>
				</div>

	}
})

module.exports = ConfirmBattle