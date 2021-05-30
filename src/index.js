import app from './app'
import SocketServer from "socket.io";

//config db
import './database/config'

//configure authentication strategies
import './middlewares/local-strategy'
import './middlewares/jwt-strategy'

//config app
export const server = app.listen(process.env.PORT)

//web sockets
const io = new SocketServer(server)
app.set('io', io)
io.on('connection', (socket) => {
  socket.emit('countClients', socket.client.conn.server.clientsCount)
  socket.broadcast.emit('countClients', socket.client.conn.server.clientsCount)

  socket.on('disconnect', () => {
    socket.emit('countClients', socket.client.conn.server.clientsCount)
    socket.broadcast.emit('countClients', socket.client.conn.server.clientsCount)
  })
})

console.log(`listen on port ${process.env.PORT}`) 