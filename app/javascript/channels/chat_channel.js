import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const chatContainer = document.getElementById('chat-container')
  
  if (chatContainer) {
    const chatRoomId = chatContainer.dataset.chatroomId
    const currentUserId = chatContainer.dataset.currentUserId
    // console.log(`current_user no chat_channel.js ${currentUserId}`);

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

  document.addEventListener('turbolinks:load', () => {
    const sendButton = document.getElementById('send-button')
    const chatInput = document.getElementById('chat-input')
    const chatContainer = document.getElementById('chat-container')
  
    if (sendButton && chatInput && chatContainer) {
      const chatRoomId = chatContainer.dataset.chatroomId
      const subscription = consumer.subscriptions.create(
        { channel: "ChatChannel", chat_room_id: chatRoomId },
        { received: data => {} }  // handled above
      )
  
      const sendMessage = () => {
        const content = chatInput.value.trim()
        if (content) {
          subscription.send({ content: content })
          chatInput.value = ''
        }
      }
  
      sendButton.addEventListener('click', sendMessage)
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          sendMessage()
        }
      })
    }
  })
})


