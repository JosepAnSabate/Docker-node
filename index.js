const express = require("express");
const mongoose = require('mongoose');
// redis
const session = require('express-session');
const redis = require('redis');
const cors = require("cors");
let RedisStore = require('connect-redis')(session);


const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

const app = express()

const postRouter=require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes")


const connectWithRetry = ()  => {
 mongoose
    .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?
    authSource=admin`)
    .then(() => console.log("succesfully connected to DB"))
    .catch((e) => {
         console.log(e)
         setTimeout(connectWithRetry, 5000) // after 5 seconds retry
    });   
};

connectWithRetry();

app.enable("trust proxy"); // rate limiting
// middlewares
app.use(cors({}));
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,  
        maxAge: 40000, // user time session ms
    }
})
);

app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hi There!!!</h2>");
    console.log("yea run");
});

//localhost:3000/posts
app.use("/api/v1/posts", postRouter); 
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))