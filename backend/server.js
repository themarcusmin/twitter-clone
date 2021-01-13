const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true
}

// middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// database connection
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
)
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// import routes
const authRoutes = require("./routes/authRoutes");

// routes
app.use(authRoutes);

// cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//     res.send('You got the cookies');
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// })