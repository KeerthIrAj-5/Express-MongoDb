const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
.then((res)=>{
    console.log("Database connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allc=[
    {
    from:"Ram",
    to:"priya",
    msg:"Bring laptop",
    created_at:new Date()
},
{
    from:"Rohit",
    to:"Ram",
    msg:"All the best",
    created_at:new Date()
},
{
    from:"priya",
    to:"Lakshmi",
    msg:"Did you solve the problems",
    created_at:new Date()
},
{
    from:"Rohit",
    to:"priya",
    msg:"Movie?",
    created_at:new Date()
},
{
    from:"Ram",
    to:"Rohit",
    msg:"Any plans this weekend?",
    created_at:new Date()
}
];
Chat.insertMany(allc);
