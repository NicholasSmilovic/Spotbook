const express = require('express');
const SocketServer = require('ws').Server;
const messageParse = require('./messageParse.js')


const PORT = 8080;


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
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
    messageParse(JSON.parse(data), ws, wss.broadcast)
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});