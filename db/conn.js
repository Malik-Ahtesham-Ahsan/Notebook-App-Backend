const mongoose = require("mongoose");

const DB ="mongodb+srv://malikahtesham661:ahtesham1234@cluster0.yemsibn.mongodb.net/magicnotes";

mongoose.connect(DB).then(()=>
{
    console.log("conn succsful");
}).catch((e)=>
{
    console.log("not succesfull cconnect",e);
})