Basic messenger app

Features
- User authentication
- Realtime chat
- Persistent data

Built with
- node / express
- react / redux
- mongodb
- socket.io
- jsonwebtoken

Todo
- Implement register and login pages

Future implementations
- Keep tract of unread messages
- Display notification when event succeeds / fails
- Ability to delete account
- Ability to delete contacts
- Ability to leave chat rooms

Possible improvements
- Migrate to an SQL database for better data integrity (User and Conversation tables have many-to-many relationship)
- Keep track of connected clients with custom socket id, and emit to only relevant clients
- Handle errors in a more detailed fashion (e.g. based on response status)
- Ability to create / edit user profile
- Manage account details (change password, etc.)
- Add new contacts directly from chat rooms
- Loading spinner