import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static targets = ["messages", "input", "sendButton"]
  static values = { 
    chatRoomId: String,
    currentUserId: String
  }

  connect() {
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
    this.messagesTarget.insertAdjacentHTML('beforeend', data.html)
    this.#scrollToBottom()
  }

  #scrollToBottom() {
    this.messagesTarget.scrollTop = this.messagesTarget.scrollHeight
  }
}