https://sanha-messenger.herokuapp.com/

Basic messenger app

Features
- User authentication
- Realtime chat
- Data persistence
- Responsive design

Built with
- node / express
- react / redux
- mongodb
- socket.io
- jsonwebtoken
- material-ui

Todo
- Display notification on event (e.g. new message)

Future implementations
- Loading spinner
- Ability to delete account, delete contacts, and leave chat rooms
- Ability to add new contacts directly from chat rooms
- User profile and account management

Possible improvements
- Migrate to an SQL database for better data integrity (User and Conversation tables have many-to-many relationship)
- Keep track of connected clients with custom socket id, and emit to only relevant clients
- Detailed error handling (e.g. based on response status and message)