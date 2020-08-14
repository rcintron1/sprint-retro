const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
// app.use(routes);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('event', { someProperty: msg })
    console.log('message: ' + msg);
  });
});

// Start the API server
http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
