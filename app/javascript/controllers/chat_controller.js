import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static targets = ["messages", "input", "sendButton"]
  static values = { 
    chatRoomId: String,
    currentUserId: String
  }

  connect() {
    // console.log("Chat controller conectado. Usuário atual:", this.currentUserIdValue)
    this.channel = consumer.subscriptions.create(
      {
        channel: "ChatChannel",
        chat_room_id: this.chatRoomIdValue
      },
      {
        received: this.#received.bind(this)
      }
    )
    this.#scrollToBottom()
  }

  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe()
    }
  }

  sendMessage(event) {
    event.preventDefault()
    const content = this.inputTarget.value.trim()
    
    if (content) {
      this.channel.send({ content: content })
      this.inputTarget.value = ''
    }
  }

  onKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.sendMessage(event)
    }
  }

  #received(data) {
    const isCurrentUser = data.user_id.toString() === this.currentUserIdValue
    const messageHTML = this.#buildMessageHTML(data, isCurrentUser)
    this.messagesTarget.insertAdjacentHTML('beforeend', messageHTML)
    this.#scrollToBottom()
  }

  #buildMessageHTML(data, isCurrentUser) {
    return `
      <div class="message mb-2 ${isCurrentUser ? 'text-end' : 'text-start'}"
           data-message-user-id="${data.user_id}">
        <div class="d-inline-block p-2 rounded ${isCurrentUser ? 'bg-primary text-white' : 'bg-light'}" 
             style="max-width: 70%;">
          <small class="d-block ${isCurrentUser ? 'text-white-50' : 'text-muted'}">
            ${data.user_email}
          </small>
          ${data.content}
        </div>
      </div>
    `
  }

  #scrollToBottom() {
    this.messagesTarget.scrollTop = this.messagesTarget.scrollHeight
  }
}