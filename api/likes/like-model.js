const db = require("../../data/db-config");

function getLikesPostId(post_id) {
  return db("likes").where({ post_id });
}

function getLikesCommentId(comment_id) {
  return db("likes").where({ comment_id });
}

function getCreateLike(like) {
  return db("likes").insert(like).returning("*");
}

function getLikeByUserIdAndPostId(user_id, post_id) {
  return db("likes").where({ user_id, post_id }).first();
}

function removeLikeByUserIdAndPostId(user_id, post_id) {
 return db("likes").where({ user_id, post_id }).del();
}


module.exports = {
  getLikesPostId,
  getLikesCommentId,
  getCreateLike,
  getLikeByUserIdAndPostId,
  removeLikeByUserIdAndPostId,
};
