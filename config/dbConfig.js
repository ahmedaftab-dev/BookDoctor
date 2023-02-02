const mongoose=require("mongoose");
console.log(process.env.MONGO_URL)

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected",()=>{
    console.log("Mongo DB is connected")
});
connection.on("error",(error)=>{
    console.log("Mongo DB is not connected",error)
});
module.exports = mongoose;