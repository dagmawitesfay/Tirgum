const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/database")


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
// app.use(logger("dev"));

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

app.get("/",async(req,res)=>{
    res.send("HI")
})