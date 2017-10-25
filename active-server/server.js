const express = require('express');
const SocketServer = require('ws').Server;
const messageParse = require('./messageParse.js')


// Set the port to 3001
const PORT = 8080;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

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
    messageParse(JSON.parse(data), wss.broadcast)
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});