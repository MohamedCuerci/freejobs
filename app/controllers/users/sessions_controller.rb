# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  before_action :disconnect_cable, only: [ :destroy ]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def disconnect_cable
    return unless current_user

    # Desconecta todas as conexões associadas ao usuário
    ActionCable.server.remote_connections.where(current_user: current_user).disconnect
    # p "Desconectando usuário #{current_user.id} do ActionCable"
  end
end
