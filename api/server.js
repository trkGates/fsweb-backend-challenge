const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: `Twiter clon up  ` });
});

server.use("/users", require("./users/users-router"));
server.use("/posts", require("./posts/post-router"));
server.use("/comments", require("./comments/comment-router"));

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
module.exports = server;
