require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//  My routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');

//DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  //MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//PORT
const port = process.env.PORT || 8000;

//MY ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api',categoryRoutes);

//STARTING THE SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
