const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://greatsoumya:${password}@cluster0.bn8v03d.mongodb.net/blogApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", noteSchema);

const blog = new Blog({
  title: "Stop Patriarchy",
  author: "Govindankutty",
  url:"http/stopPatriarchy",
  likes:1000000
});

/* blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
}); */

Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
