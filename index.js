const express = require('express');
const app = express();
const path = require('path');
// app.use(express.static(path.join(__dirname,"public/css")));

const { v4: uuidv4 } = require('uuid');
 
const methodOverride = require('method-override')

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.set("views",(path.join(__dirname,"views")));
app.use(express.urlencoded(({extended:true})));
const port = 8080;




let posts = [
    {
        id: uuidv4(),
        username: "rohan",
        content: "I love Coding !"
    },
    {
        id: uuidv4(),
        username: "rahul",
        content: "I do hardwork !"
    },
    {
        id: uuidv4(),
        username: "lalit",
        content: "I love hacking !"
    }
];


app.listen(port, () => {
  console.log(` app listening on port ${port}`)
});

app.get("/posts",(req,res) => {
    res.render("index.ejs",{posts});
  });
  
  app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
  });

  app.post("/posts",(req,res) => {
    let {username,content} =req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
  });

  app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
  });

  app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
  });

  app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
  });

  app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

  });