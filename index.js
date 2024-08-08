const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride = require('method-override')
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main()
.then((res)=>{
    console.log("Database connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1=new Chat({
//     from:"Ram",
//     to:"priya",
//     msg:"Send pyqs",
//     created_at:new Date()
// });
// chat1.save()
// .then((res)=>{
//     console.log(res);
// });

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});

app.get(("/"),(req,res)=>{
    res.send("Root is working");
});

app.get(("/chats"),async (req,res)=>{
    let chats=await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
});

app.get(("/chats/new"),(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats/new",(req,res)=>{
    let {from,msg,to}=req.body;
    let newc=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newc.save()
    .then((result)=>{
        res.redirect("/chats");
    })
    .catch((err)=>{
        res.send("Some error saving");
    });
});

app.get(("/chats/:id/edit"),async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.put(("/chats/:id"),async (req,res)=>{
    let {msg:nmsg}=req.body;
    let {id}=req.params;
    console.log(nmsg);
    let chat=await Chat.findByIdAndUpdate(id,{msg:nmsg},{runValidators:true,new:true});
    res.redirect("/chats");
});

app.delete(("/chats/:id"),async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
