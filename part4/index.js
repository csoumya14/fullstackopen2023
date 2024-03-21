require("dotenv").config();
const express = require("express");
const app = express();

const Blog = require("./models/blog");

app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});


app.get("/api/blogs/:id", (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    response.json(blog);
  });
});

const generateId = () => {
  const maxId = blogs.length > 0 ? Math.max(...blogs.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/blogs", (request, response) => {
  const body = request.body;
  console.log("body", body);
  if (body.title === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog.save().then((savedBlog) => {
    response.json(savedBlog);
  });
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
