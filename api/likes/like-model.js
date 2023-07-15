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
module.exports = {
    getLikesPostId,
    getLikesCommentId,
    getCreateLike
};
