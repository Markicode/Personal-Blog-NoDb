import express from "express";
import bodyParser from "body-parser";
import dateFormat from "date-format";

const app = express();
const port = 8080;
let blogs = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        allBlogs: blogs
    });   
});

app.get("/writeblog", (req, res) => {
    res.render("writeblog.ejs");
});

app.post("/submitblog", (req, res) => {
    console.log(req.body);
    let datePosted = dateFormat("dd-MM-yyyy - hh:mm", new Date());
    let newBlog = new Blog(req.body["title"], datePosted, req.body["content"]);
    blogs.push(newBlog);
    res.redirect("/");
});

app.post("/submitblogedit", (req, res) => {
    blogs[req.body["index"]].title = req.body["title"];
    blogs[req.body["index"]].content = req.body["content"];
    res.redirect("/");
});

app.get("/delete", (req, res) => {
    blogs.splice(req.query.id, 1);
    res.redirect("/");
});

app.get("/edit", (req, res) => {
    res.render("editblog.ejs", {
        blog: blogs[req.query.id],
        index: req.query.id
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

function Blog(title, date, content)
{
    this.title = title;
    this.date = date;
    this.content = content;
}