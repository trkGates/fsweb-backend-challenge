const db = require("../../data/db-config");

function getLikesPostId(post_id) {
  return db("likes").where({ post_id });
}

function getLikesCommentId(comment_id) {
  return db("likes").where({ comment_id });
}

async function getCreateLike(like) {
  await db("likes").insert(like).returning("*");
  await db("comments").where({ comment_id }).increment("like_sayisi", 1);
  return;
}
async function userİdvePostİdVarMi(user_id, post_id) {
  const user = await db("likes").where({ user_id, post_id }).first();
  if (user) {
    return true;
  } else {
    return false;
  }
}

// async function updateLike(likeData) {
//   const { user_id, post_id, post_like, comment_id, comment_like } = likeData;

//   try {
//     // Güncelleme işlemini yapar ve güncellenmiş beğeni satırını alırız.
//     const updatedRows = await db("likes")
//       .where({ user_id, post_id })
//       .update({ post_like, comment_like, tarih: db.fn.now() });

//     if (updatedRows > 0) {
//       // Güncelleme başarılı olduysa, güncellenmiş beğeni satırını almak için tekrar sorgulama yaparız.
//       const updatedLike = await db("likes").where({ user_id, post_id }).first();
//       return updatedLike; // Güncellenmiş beğeni satırını döndürürüz.
//     } else {
//       throw new Error("Beğeni güncellenirken bir hata oluştu.");
//     }
//   } catch (error) {
//     throw error;
//   }
// }
async function updateLike(likeData) {
  const { user_id, post_id, comment_id } = likeData;

  try {
    // Mevcut beğeni satırlarını sorgulayalım.
    const existingLikes = await db("likes")
      .where({ user_id, post_id })
      .select("comment_id")
      .first();

    if (existingLikes) {
      // Mevcut beğeni varsa, o yorumu daha önce beğenip beğenmediğimizi kontrol edelim.
      const likedCommentIds = existingLikes.comment_id
        ? existingLikes.comment_id.split(",")
        : [];
      const isAlreadyLiked = likedCommentIds.includes(comment_id.toString());

      if (isAlreadyLiked) {
        // Eğer o yorumu daha önce beğenmişsek, sadece comments tablosunda like_sayisi'ni azaltalım.
        await db("comments").where({ comment_id }).decrement("like_sayisi", 1);

        // Beğeni satırından da ilgili comment_id'yi çıkaralım.
        const updatedCommentIds = likedCommentIds
          .filter((id) => id !== comment_id.toString())
          .join(",");
        await db("likes")
          .where({ user_id, post_id })
          .update({ comment_id: updatedCommentIds });
      } else {
        // Eğer o yorumu daha önce beğenmediysek, yeni comment_id ekleyelim ve comments tablosunda like_sayisi'ni artıralım.
        const updatedCommentIds = [
          ...likedCommentIds,
          comment_id.toString(),
        ].join(",");
        await db("likes")
          .where({ user_id, post_id })
          .update({ comment_id: updatedCommentIds });

        await db("comments").where({ comment_id }).increment("like_sayisi", 1);
      }
    } else {
      // Mevcut beğeni yoksa, yeni bir beğeni satırı ekleyelim ve comments tablosunda like_sayisi'ni artıralım.
      await db("likes").insert({
        user_id,
        post_id,
        comment_id: comment_id.toString(),
        comment_like: true,
      });

      await db("comments").where({ comment_id }).increment("like_sayisi", 1);
    }
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getLikesPostId,
  getLikesCommentId,
  getCreateLike,
  userİdvePostİdVarMi,
  updateLike,
};
