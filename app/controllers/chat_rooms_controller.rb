class ChatRoomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chat_rooms = ChatRoom.all
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    @messages = @chat_room.messages.includes(:user)
    @user = current_user
  end

  def create
    @chat_room = ChatRoom.create(name: params[:name])
    redirect_to chat_room_path(@chat_room.id)
  end

  def destroy
    @chat_room = ChatRoom.find(params[:id])
    Message.where(chat_room_id: @chat_room.id).delete_all # isso n executa callbacks
    @chat_room.destroy

    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.remove(@chat_room) }
      format.html { redirect_to chat_rooms_path, notice: "Sala de chat deletada." }
    end
  end
end
