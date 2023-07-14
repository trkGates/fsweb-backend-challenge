const express = require("express");
const routerPost = express.Router();

const postsModel = require("./post-model");
const userModel = require("../users/users-model");

routerPost.get("/", async (req, res, next) => {
  try {
    const posts = await postsModel.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

routerPost.get("/:id", async (req, res, next) => {
  try {
    const post = await postsModel.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

routerPost.post("/", async (req, res, next) => {
  try {
    const KullanıcıMevcutmu = await userModel.getUserById(req.body.user_id);
    const post = await postsModel.addPost(req.body);

    if (KullanıcıMevcutmu) {
      res.status(201).json(post);
    } else {
      res.status(404).json({
        message:
          "Kullanıcı bulunamadı. Lütfen Giriş yapınız veya Kayıt olunuz.",
      });
    }
  } catch (err) {
    next(err);
  }
});

routerPost.put("/:id", async (req, res, next) => {
  try {
    const post = await postsModel.updatePost(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

routerPost.delete("/:id", async (req, res, next) => {
  try {
    const silinenPost = await postsModel.getPostById(req.params.id);
    const post = await postsModel.deletePost(req.params.id);
    if (!silinenPost && !post) {
      res.status(404).json({ message: "Post bulunamadı veya silinirken hata oluştu" });
    } else {
      res.status(200).json(silinenPost);
    }
  } catch (err) {
    next(err);
  }
});

routerPost.get("/user/:id", async (req, res, next) => {
  try {
    const posts = await postsModel.getPostByUserId(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});


module.exports = routerPost;
