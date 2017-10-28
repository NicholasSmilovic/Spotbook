const express = require('express');
const SocketServer = require('ws').Server;
const messageParse = require('./messageParse.js')


const PORT = 8080;
let id = 0;
let sockets = {}
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  ws.id = id++
  sockets[ws.id] = ws
  wss.broadcast = function broadcast(data, reciever, type, error) {
    message = {
      reciever: reciever,
      type: type,
      data: data,
      error: error
    }
    wss.clients.forEach(function each(client){
      if(client.readyState === ws.OPEN){
        client.send(JSON.stringify(message))
      }
    })
  }
  ws.on('message', (data) => {
    console.log("recieved message")
    console.log(data)
    let socketJoin = messageParse(JSON.parse(data), ws, wss.broadcast)
    if(socketJoin) {
      ws.playlist = socketJoin
    }

  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    console.log(sockets[ws.id])
    sockets[ws.id] = ""
    console.log(sockets[ws.id])
  });
});