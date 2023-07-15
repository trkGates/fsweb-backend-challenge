const express = require("express");
const router = express.Router();

const likesModel = require("./like-model");
const postsModel = require("../posts/post-model");
const usersModel = require("../users/users-model");
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
    if (!user_id) {
      return res.status(400).json({ message: "User id is required" });
    }

    // Kullanıcının var olup olmadığını kontrol edin
    const userExists = await usersModel.getUserById(user_id);
    if (!userExists) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Kullanıcının zaten belirtilen gönderiye like atıp atmadığını kontrol edin
    const existingLike = await likesModel.getLikeByUserIdAndPostId(user_id, post_id);
    if (existingLike) {
      // Kullanıcı beğeniyi iptal etmek istemiş, beğeniyi kaldırın
      await likesModel.removeLikeByUserIdAndPostId(user_id, post_id);

      // Gönderinin like_sayisi alanını azaltın
      await postsModel.decrementLikeCount(post_id);

      return res.status(200).json({ message: "Beğeni başarıyla iptal edildi." });
    }

    // Yeni beğeni ekleyin
    const newLike = await likesModel.getCreateLike(req.body);

    // "post_id" varsa ilgili gönderinin "like_sayisi" alanını güncelleyin
    if (post_id) {
      await postsModel.incrementLikeCount(post_id);
    }

    res.status(201).json(newLike);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
