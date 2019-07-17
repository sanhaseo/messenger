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
- Fix api design
- Implement register and login pages

Future implementations
- Display notification when event succeeds / fails
- Ability to delete account
- Ability to delete contacts
- Ability to leave chat rooms

Possible improvements
- Migrate to an SQL database for better data integrity (User and Conversation tables have many-to-many relationship)
- Keep track of connected clients with custom socket id, and emit to only relevant clients
- Detailed error handling (e.g. based on response status and message)
- Ability to create / edit user profile
- Manage account details (change password, etc.)
- Add new contacts directly from chat rooms
- Loading spinner