const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for move events from clients
    socket.on('move', (moveData) => {
        console.log('Received move:', moveData);

        // Broadcast the move to all other clients
        socket.broadcast.emit('move', moveData);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
