import { io, Socket } from 'socket.io-client'
import { Channel, GameMessage, GameState } from '../../common/types';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket: Socket = io(URL)

socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});


socket.on('serverEvent', (data) => {
    console.log('Received response from server:', data);
});

socket.on('testEvent', (data) => {
    console.log('Message from server', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});