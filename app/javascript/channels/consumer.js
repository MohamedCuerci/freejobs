// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from "@rails/actioncable"


const userId = document.cookie
  .split('; ')
  .find(row => row.startsWith('user_id='))
  ?.split('=')[1];

export default createConsumer(`/cable?user_id=${userId}`);
// export default createConsumer()
