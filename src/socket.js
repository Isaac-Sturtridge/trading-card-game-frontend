import {io} from 'socket.io-client'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5173';

export const socket = io.connect(URL)