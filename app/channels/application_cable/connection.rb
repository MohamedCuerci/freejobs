module ApplicationCable
  class Connection < ActionCable::Connection::Base
      # rescue_from StandardError, with: :report_error
      identified_by :current_user

      def connect
        self.current_user = find_verified_user
        # logger.add_tags "ActionCable", current_user.email # preciso entender melhor
      end

      private

      def find_verified_user
        verified_user = env["warden"].user

        if verified_user
          verified_user
        else
          reject_unauthorized_connection
        end
      end

    #   # def report_error(e)
    #   #   SomeExternalBugtrackingService.notify(e)
    #   # end
  end
end
