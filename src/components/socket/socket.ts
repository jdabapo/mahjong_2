import { io, Socket } from 'socket.io-client'
import { EventTypes } from '../../common/events'
import store from '../../actions/store'
import { RECEIVE_HAND } from '../../actions/mahjongActionTypes'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

export const socket: Socket = io(URL)

socket.on('connect', () => {
    console.log('Connected to server:', socket.id)
})

socket.on('connect_error', (err) => {
    console.error('Connection error:', err)
})


socket.on(EventTypes.gameStateMessage, (data) => {
    console.log('Received response from server:', data)
    store.dispatch({
        type: RECEIVE_HAND,
        payload: data.hand
    })
})

socket.on('testEvent', (data) => {
    console.log('Message from server', data)
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})