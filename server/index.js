const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const db = require('./models');

app.use(cors());
app.use(express.json());

// Routers -----------------------------------
const adminRouter = require('./routes/Admin');
app.use('/admin', adminRouter);

const usersRouter = require('./routes/Users');
app.use('/users', usersRouter);

const booksRouter = require('./routes/Books');
app.use('/books', booksRouter);

// Database with Server ----------------------
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT:${process.env.PORT}`);
  });
});

// search for books.
// edit books
// ivertinti knyga.
// admin - control users, add book categories,
