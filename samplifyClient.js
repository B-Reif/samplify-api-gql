const SamplifyClient = require("samplify-node");
require("dotenv").config();
const { CLIENT_ID, USERNAME, PASSWORD, URL } = process.env;

const makeClient = () =>
	new SamplifyClient({
		url: URL,
		clientId: CLIENT_ID,
		username: USERNAME,
		password: PASSWORD
	});

module.exports = { makeClient };
