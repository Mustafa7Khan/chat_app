const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (Socket) => {
    console.log("A user connected");

     // Handle incoming chat messages
     Socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
     });

     // Handle user disconnections
      Socket.on('disconnect', () => {
        console.log('A user disconnected')
      });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});




