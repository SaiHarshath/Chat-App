import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    port = process.env.PORT || 3000

const app = express(),
    server = createServer(app),
    io = new Server(server)

io.on("connection", socket => {
    socket.on("chat-message", msg => {
        socket.broadcast.emit("chat-message", msg)
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.use("/public", express.static(path.join(__dirname, "./assets")))

server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
