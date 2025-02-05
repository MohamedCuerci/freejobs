class ChatRoom < ApplicationRecord
  has_many :messages, dependent: :destroy # tb da pra usar :delete_all, porém n executa callback's
end
