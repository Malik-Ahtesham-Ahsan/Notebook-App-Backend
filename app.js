const express = require("express")
const mongoose = require("mongoose")
const port = process.env.Port || 7000;
// const hbs = require("hbs");
const app = express();
require("./db/conn")
const path=require("path")
const User =require("./models/Userschema")
const router =require("./routes/authrouter")
var cors = require('cors')


app.use(cors())


const { urlencoded } = require("express");
// const static_path = path.join(__dirname, "../public")
// const template_path = path.join(__dirname, "../templates/views")
// console.log(template_path);
// const partial_path = path.join(__dirname, "../templates/partial")
// app.use(express.static(static_path))
// app.set("view engine", "hbs");
// app.set("views", template_path)
// hbs.registerPartials(partial_path)
app.use(express.json())
app.use(urlencoded({ extended: false }))


app.use(express.json());
app.use('/api/authrouter',require('./routes/authrouter'))
app.use('/api/notesrouter',require('./routes/notesrouter'))

app.get("/",(req,res)=>
{
    res.render("index");
    
})





app.listen(port, () => {
    console.log(`mongo  is set at ${port}`);
})