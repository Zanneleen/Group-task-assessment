const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')
const users = require('./routes/api/users');
const todoRouter = require('./routes/api/todos');
const cors = require('cors');

const app = express();
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// DB Config
const db = require('./config/keys.js').mongoURI;

// Connection to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("MongoDB server up and running..."))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use('/api/todos', todoRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server connected on the following port: ${port}`))
