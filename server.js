const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));


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

http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

