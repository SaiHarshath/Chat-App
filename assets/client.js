import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"

const socket = io()

const messageFormEl = document.querySelector('.message-form')
const messageInputEl = document.querySelector('.message-field')
const chatListingEl = document.querySelector('.chat-listing')

messageFormEl.addEventListener('submit', function (e) {
    e.preventDefault()
    if (messageInputEl.value) {
        socket.emit('chat-message', messageInputEl.value)

        const chatMessage = document.createElement("li")
        chatMessage.textContent = messageInputEl.value
        chatMessage.classList.add("my-message")

        chatListingEl.appendChild(chatMessage)
        messageInputEl.value = ''
    }
})

socket.on('chat-message', function (msg) {
    const chatMessage = document.createElement("li")
    chatMessage.textContent = msg

    chatListingEl.appendChild(chatMessage)
    window.scrollTo(0, document.body.scrollHeight)
})