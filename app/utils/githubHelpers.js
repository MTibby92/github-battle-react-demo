var axios = require('axios')

// this block only necessary if you're getting rate limited and need an API key from GitHub
var id = 'YOUR_CLIENT_ID'
var sec = 'YOUR_SECRET_ID'
var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo(username) {
	return axios.get('https://api.github.com/users/' + username + param)
}

var helpers = {
	getPlayersInfo: function(players) {
		// fetch some data from GitHub
		return axios.all(players.map(function(username) { // axios.all expects an array of promises ; players is an array of usernames ; map evaluates each username to the subsequent function
			return getUserInfo(username) // returns a Promise until the axios get call returns
		})).then(function(info) { // once all the promises have been resolved, axios passes it as info in .then()
			// console.log('INFO', info)
			return info.map(function(user) {
				return user.data
			})
		}).catch(function(err) {
			console.warn('Error in getPlayersInfo', err)
		})
	}
}

module.exports = helpers