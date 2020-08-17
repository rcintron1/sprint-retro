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
let count = 0
// io.on('connection', (socket) => {
//   console.log('connection count:',++count)
//   socket.on('chat message', (msg) => {
//     io.emit('event', msg )
//     console.log('message: ' + JSON.stringify(msg));
//   });
//   socket.on('disconnect', () => {
//     console.log('connection count:', --count);
//   });
// });


io.on('connection', function(socket){

  var room = socket.handshake['query']['r_var'];

  socket.join(room);
  console.log('user joined room #'+room);

  socket.on('disconnect', function() {
    socket.leave(room)
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.to(room).emit('chat message', msg);
  });

});

// Start the API server
http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
