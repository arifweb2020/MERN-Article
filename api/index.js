const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const articleRoute = require("./routes/article");
const path = require("path");


dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify:true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

console.log("welcome to article blog");



app.use("/articles", articleRoute);


app.listen("5000", () => {
    console.log("Backend is running.");
});