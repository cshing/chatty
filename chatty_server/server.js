const express = require('express');
const WS = require('ws');
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WS.Server({ server });

// Colors assigned to users
const colors = [
  '#ff69b4', // hot pink
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
]

// Broadcast to all.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WS.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // code to broadcast count of connections after a client connects
  const userCount = {
    type: 'incomingCount',
    userCount: wss.options.server._connections
  }
  wss.broadcast(userCount);

  // radom color assigned to user upon connection
  const userColor = colors[Math.floor(Math.random() * colors.length)];

  ws.on('message', (data) => {
    const incomingData = JSON.parse(data);

    switch(incomingData.type) {
      // code to handle postMessage
      case 'postMessage': {
        const message = {
          type: 'incomingMessage',
          id: uuid(),
          username: incomingData.username,
          content: incomingData.content,
          userColor: userColor
        }
        wss.broadcast(message);
        break;
      }

      // code to handle postNotification
      case 'postNotification': {
        const notification = {
          type: 'incomingNotification',
          id: uuid(),
          username: '',
          notification: incomingData.notification,
          userColor: ''
        }
        wss.broadcast(notification);
        break;
      }

      // show an error in the console if the message type is unknown
      default:
      throw new Error('Unknown event type ' + incomingData.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    // code to broadcast count of connections after a client disconnects
    const userCount = {
      type: 'incomingCount',
      userCount: wss.options.server._connections
    }
    wss.broadcast(userCount);
  });
});