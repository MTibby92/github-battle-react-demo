var React = require('react')
var PropTypes = React.PropTypes

function puke(obj) {
	return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

var Results = React.createClass({
	propTypes: {
		isLoading: PropTypes.bool.isRequired,
		scores: PropTypes.array.isRequired,
		playersInfo: PropTypes.array.isRequired
	},
	render: function() {
		return (
			<div> Results: {puke(this.props)} </div>
		)
	}
})

module.exports = Results