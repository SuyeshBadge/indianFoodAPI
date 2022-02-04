const dotenv = require('dotenv'); //module for environment variable
const mongoose = require('mongoose'); //module for mongoDB connections

// error handling for uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err);
  process.exit(1);
});

//setting up the config for the project
dotenv.config({ path: './config.env' });
const app = require('./app'); //module for the express app

// MongoDB connection
const DB = process.env.DB_PATH.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

//assigning the port
const port = process.env.PORT || 8080;

//server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//error handling for the rejected promises
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
