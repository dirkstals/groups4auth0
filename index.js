const Server = require('./src/index');

const app = Server();

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server started on port', port);
})
