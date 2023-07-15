const express = require("express");
const router = express.Router();

const likesModel = require("./like-model");

router.get("/postid/:id", async (req, res, next) => {
  try {
    const likes = await likesModel.getLikesPostId(req.params.id);
    if (likes < 1) {
      res.status(404).json({ message: "Post İçin begeni bulunamadı" });
    } else {
      res.status(200).json(likes);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/commentid/:id", async (req, res, next) => {
  try {
    const likes = await likesModel.getLikesCommentId(req.params.id);
    if (likes < 1) {
      res.status(404).json({ message: "Yorum için begeni bulunamadı." });
    } else {
      res.status(200).json(likes);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { post_id, comment_id, user_id } = req.body;
    if ((post_id == undefined) & (comment_id == undefined)) {
      return res.status(400).json({ message: "Beğeni yapmadınız" });
    }
    if (!user_id) {
      return res.status(400).json({ message: "User id is required" });
    }
    const newLike = await likesModel.getCreateLike(req.body);
    res.status(201).json(newLike);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
