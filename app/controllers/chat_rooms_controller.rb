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
end
