const express = require("express")
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
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
}

connectWithRetry();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!</h2>");
})

//localhost:3000/posts
app.use("/api/v1/posts", postRouter); 
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))