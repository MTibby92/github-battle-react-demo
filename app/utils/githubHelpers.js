var axios = require('axios')

// this block only necessary if you're getting rate limited and need an API key from GitHub
var id = 'YOUR_CLIENT_ID'
var sec = 'YOUR_SECRET_ID'
var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo(username) {
	return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos(username) {
	// fetch username's repos
	return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100')
}

function getTotalStars(repos) {
	// calculate all the stars that the user has
	return repos.data.reduce(function(prev, current) {
		return prev + current.stargazers_count
	}, 0) // function will go through each repo and get the total number of stars, we specified prev to start at 0
}

function getPlayersData(player) {
	// get repos
	// get total stars
	// return object with that data
	return getRepos(player.login)
		.then(getTotalStars)
		.then(function(totalStars) {
			return {
				followers: player.followers,
				totalStars: totalStars
			}
		})
}

function calculateScores(players) {
	// return an array after doing some fancy algorithms to determine the winner
	return [
		players[0].followers * 3 + players[0].totalStars,
		players[1].followers * 3 + players[1].totalStars
	]
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
	},
	battle: function(players) {
		var playerOneData = getPlayersData(players[0]) // will return a promise
		var playerTwoData = getPlayersData(players[1]) // will return a promise so we need axios.all

		return axios.all([playerOneData, playerTwoData])
			.then(calculateScores)
			.catch(function(err) {
				console.warn('Error in battle function', err)
			})
	}
}

module.exports = helpers