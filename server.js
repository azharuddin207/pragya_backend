const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const path = require("path");

// db connection file imported
require('./config/dbconnection');

// essential middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// admin routes
const servicesRouter = require("./routes/api/admin/services");
const authRouter = require('./routes/api/admin/auth');

// user routes
const userRouter = require('./routes/api/user');

// admin apis
app.use('/api/admin/auth', authRouter);
app.use('/api/admin/services', servicesRouter);

// user apis
app.use("/api/user", userRouter);

// if (process.env.NODE_ENV === "production") {
//   // js and css files
//   app.use(express.static("admin"));
//   // index.html
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "admin"));
//   });
// }

app.listen(port, () => console.log(`server started on port ${port}`));
