const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// roles
const rolesRouter = require('./routes/roles');
app.use('/api', rolesRouter);

// sessions
// const sessionsRouter = require('./routes/sessions');
// app.use('/api', sessionsRouter);

// users
const usersRouter = require('./routes/users');
app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

/*
Create query to get session data without user 
Create query to get session data with user and roles 
  Create mutation to create roles 
Create mutation to create sessions with users 
  Create mutation to edit user information 
  Create mutation to edit roles 
  Create mutation to delete the session 
  Create mutation to delete roles 
*/
