class ChatChannel < ApplicationCable::Channel
  def subscribed
    # ele passa aqui pra cada chat criado
    chat_room_id = params[:chat_room_id]
    stream_from "chat_#{chat_room_id}"
  end

  def unsubscribed
    # Opcional: lógica de limpeza quando o usuário sai do canal
  end

  def receive(data)
    chat_room_id = params[:chat_room_id]

    message = Message.create!(
      user: current_user,
      chat_room_id: chat_room_id,
      content: data["content"]
    )

    # Renderiza a mensagem usando partial para HTML completo
    html = ApplicationController.render(
      partial: "messages/message",
      locals: {
        message: message,
        user: current_user
      }
    )

    ActionCable.server.broadcast(
      "chat_#{chat_room_id}",
      {
        message_user_id: current_user.id,
        html: html
      }
    )
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: "messages/message", locals: { message: message })
  end
end
