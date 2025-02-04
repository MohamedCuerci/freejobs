import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const chatContainer = document.getElementById('chat-container')
  
  if (chatContainer) {
    const chatRoomId = chatContainer.dataset.chatroomId
    const currentUserId = chatContainer.dataset.currentUserId

    consumer.subscriptions.create(
      {
        channel: "ChatChannel",
        chat_room_id: chatRoomId
      },
      {
        received(data) {
          const messageContainer = document.getElementById('messages')
          const isCurrentUser = data.user_id.toString() === currentUserId
          
          // Criar o HTML da mensagem com base em quem enviou
          const messageHTML = `
            <div class="message mb-2 ${isCurrentUser ? 'text-end' : 'text-start'}">
              <div class="d-inline-block p-2 rounded ${isCurrentUser ? 'bg-primary text-white' : 'bg-light'}" style="max-width: 70%;">
                <small class="d-block ${isCurrentUser ? 'text-white-50' : 'text-muted'}">
                  ${data.user_email}
                </small>
                ${data.content}
              </div>
            </div>
          `
          
          messageContainer.insertAdjacentHTML('beforeend', messageHTML)
          messageContainer.scrollTop = messageContainer.scrollHeight
        }
      }
    )
  }
})