class ChatChannel < ApplicationCable::Channel
  def subscribed
    chat_room_id = params[:chat_room_id]
    stream_from "chat_#{chat_room_id}"
  end

  def unsubscribed
    # Opcional: lógica de limpeza quando o usuário sai do canal
    # p "Usuário #{current_user.email} desconectado do chat #{params[:chat_room_id]}"
  end

  def receive(data)
    chat_room_id = params[:chat_room_id]

    # p "dentro do chatChannel #{current_user.id}"
    message = Message.create!(
      user: current_user,
      chat_room_id: chat_room_id,
      content: data["content"]
    )

    ActionCable.server.broadcast(
      "chat_#{chat_room_id}",
      {
        content: message.content,
        user_email: message.user.email,
        user_id: message.user.id
      }
    )
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: "messages/message", locals: { message: message })
  end
end
