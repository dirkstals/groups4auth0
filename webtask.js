const Server = require('./src/index');
const tools = require('auth0-extension-express-tools');

const createServer = tools.createServer(Server);

module.exports = (context, req, res) => {
  createServer(context, req, res);
};