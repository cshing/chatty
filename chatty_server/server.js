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

// Broadcast to all.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WS.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  // console.log(wss.options.server._connections)
  console.log('Client connected');
  
  const userCount = {
    type: 'incomingCount',
    userCount: wss.options.server._connections
  }
  wss.broadcast(JSON.stringify(userCount));

  ws.on('message', (data) => {
    const incomingData = JSON.parse(data);

    switch(incomingData.type) {
      case 'postMessage': {
        // code to handle postMessage
        const message = {
          type: 'incomingMessage',
          id: uuid(),
          username: incomingData.username,
          content: incomingData.content
        }
        console.log(`${message.id} - User ${message.username} said ${message.content}`);
        wss.broadcast(JSON.stringify(message));
        break;
      }

      case 'postNotification': {
        // code to handle postNotification
        const notification = {
          type: 'incomingNotification',
          id: uuid(),
          username: '',
          notification: incomingData.notification
        }
        console.log(`Notification: ${notification.notification}`);
        wss.broadcast(JSON.stringify(notification));
        break;
      }

      default:
      // show an error in the console if the message type is unknown
      throw new Error('Unknown event type ' + incomingData.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    const userCount = {
      type: 'incomingCount',
      userCount: wss.options.server._connections
    }
    wss.broadcast(JSON.stringify(userCount));
  });
});