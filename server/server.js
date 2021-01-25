// https://levelup.gitconnected.com/react-template-for-jwt-authentication-with-private-routes-and-redirects-f77c488bfb85
const express = require("express");
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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

// const tweetRoutes = require("./routes/tweetRoutes");
// app.use(tweetRoutes);


// cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//     res.send('You got the cookies');
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log("header ", req.headers.origin)
//     console.log(cookies);
//     res.json(cookies);
// })

const redis = require("redis");
const client = redis.createClient();
const subscriber = redis.createClient();
const publisher = redis.createClient();

app.post('/test/pub', (req, res) => {
    console.log(req.body);
    const userIDs = [1, 2, 3]
    userIDs.forEach(id => publisher.publish("user:" + id, "new tweetsssss", () => { console.log("pub is successful to user:" + id) }))
    // publisher.publish("user:1", "new tweet", () => { console.log("pub success to user:1") });
    res.status(200).send({ message: "Successful Publish" });
})

// ws keep tracks of users' online status and real-time newsfeed 

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
    let userID;
    // socket onopen: set online:userID Y and sub to realtime channel
    ws.on('message', function incoming(message) {
        let parsedMessage = JSON.parse(message)
        userID = parsedMessage.online
        client.set('online:' + parsedMessage.online, 'Y', redis.print)
        subscriber.subscribe('realtime:' + userID)
    })
    // for each userID, subscribe oncoming message
    subscriber.on('message', (_channel, message) => {
        // redis cmd: publish realtime:userID (JSON.stringify(tweetdata))
        // parse message to get sth like {type: new_tweet, content: {tweetdata}}
        switch (message) {
            case 'NEW_TWEET':
                console.log("newtweet")
                ws.send('new tweet content')
                break
            case 'NEW_NOTIFICATION':
                console.log("notification")
                break
        }
    })
    // socket onclose: del online:userID and unsub from realtime channel
    ws.on('close', (message) => {
        console.log('disconnected: %s', message)
        client.del('online:' + userID, redis.print)
        subscriber.unsubscribe('realtime:' + userID)
    })
});