const express = require("express");
const router = express.Router();

const commentsModel = require("./comment-model");

router.get("/", async (req, res, next) => {
  try {
    const comments = await commentsModel.getAllComments();
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const comment = await commentsModel.getCommentById(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Comment Bulunamadı" });
    } else {
      res.status(200).json(comment);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        const comment = await commentsModel.getCommentByUserId(req.params.id);
        if (comment<1) {
            res.status(404).json({ message: "Comment Bulunamadı" });
        } else {
            res.status(200).json(comment);
        }
    } catch (err) {
        next(err);
    }
});


router.post("/", async (req, res, next) => {
  try {
    const { content, user_id, post_id,like_sayisi } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Comment is required" });
    }
    if (!user_id) {
      return res.status(400).json({ message: "User Id is required" });
    }
    if (!post_id) {
      return res.status(400).json({ message: "Post Id is required" });
    }
    if (!like_sayisi) {
      return res.status(400).json({ message: "Like Sayısı belirtilmedi." });
    }
    const newComment = await commentsModel.addComment(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
    try {
        const commentVarmi = await commentsModel.getCommentById(req.params.id);
        const updatedComment = await commentsModel.updateComment(req.params.id, req.body);
        if (!commentVarmi) {
            res.status(404).json({ message: "Comment Bulunamadı" });
        } else {
            res.status(200).json(updatedComment);
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const commentVarmi = await commentsModel.getCommentById(req.params.id);
        if (!commentVarmi) {
            res.status(404).json({ message: "Comment Bulunamadı" });
        } else {
            await commentsModel.deleteComment(req.params.id);
            res.status(200).json(commentVarmi);
        }
    } catch (err) {
        next(err);
    }
});





module.exports = router;
