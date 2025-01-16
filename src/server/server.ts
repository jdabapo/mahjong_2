import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('clientEvent', (data) => {
    console.log('Received clientEvent:', data);
    console.log('Emitting serverEvent');
    socket.emit('serverEvent', { message: 'Hello from server' });
    console.log('serverEvent emitted');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});