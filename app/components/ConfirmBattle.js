var React = require('react')

function puke(obj) {
	return <pre>{JSON.stringify(obj, null, ' ')}</pre>
} // used to print all the props to the front page

var ConfirmBattle = React.createClass({
	render: function() {
		return this.props.isLoading === true
			? <p> LOADING! </p>
			: <div> CONFIRM BATTLE!: {puke(this.props)} </div> 
	}
})

module.exports = ConfirmBattle