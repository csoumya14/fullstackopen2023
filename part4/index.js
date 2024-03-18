const express = require("express");
const app = express();



let blogs = [
  {
    id: 1,
    title: "Sunday is a holiday",
    author: "Gopalan",
    url: "http//sundayisaholiday",
    likes: 2,
  },
  {
    id: 2,
    title: "Monday is a workingday",
    author: "kamakshi",
    url: "http//Mondayisaworkingday",
    likes: 12,
  },
  {
    id: 3,
    title: "Friday ends in Saturday",
    author: "karthyayini",
    url: "http//fridayendsinsaturday",
    likes: 200,
  },
];

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/blogs", (request, response) => {
  response.json(blogs);
});

app.get("/api/blogs/:id", (request, response) => {
  const id = Number(request.params.id);
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/blogs', (request, response) => {
  const body= request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const blog = {
    id:generateId(),
    title: "Talk against descrimination",
    author: "kunjappan",
    url: "http//antidescriminatorylay",
    likes: 20000
  }

  blogs = blogs.concat(blog)
  console.log(blog)
  response.json(blog)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
