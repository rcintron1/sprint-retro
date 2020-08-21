import io from 'socket.io-client';
let socket;

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}
export const socket_connect = function (room) {
    return io({
        query: 'r_var='+room
    });
  }
export const socket_connection = function(room) {
    if (!socket){
        // console.log(!socket, room)
        if (room){

          socket = socket_connect(room);
          socket.on('chat message', (data) =>{
            return data
          })
        }
      }
}

