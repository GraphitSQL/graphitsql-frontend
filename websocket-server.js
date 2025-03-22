import * as Y from 'yjs';
import { WebsocketServer } from 'y-websocket/bin/utils.js';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1234;

const wsServer = new WebsocketServer({ host, port }, null, {
  // Options for the WebSocket server
  // Set ping timeout to 30 seconds
  pingTimeout: 30000,
  // Log connections
  logConnect: true,
  // Log disconnections
  logDisconnect: true,
});

console.log(`Yjs WebSocket server running on ws://${host}:${port}`);

// Handle server errors
wsServer.on('error', (err) => {
  console.error('WebSocket server error:', err);
});
