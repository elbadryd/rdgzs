const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');


dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientID: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  callbackURL: 'http://localhost:3000/login/callback' || 'http://54.211.45.243:3000/login/callback',
});

module.exports.spotifyApi = spotifyApi;
