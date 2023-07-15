const db = require("../../data/db-config.js");

exports.getAllComments = () => {
    return db("comments");
    }

exports.getCommentById = (id) => {
    return db("comments").where("comment_id", id).first();
    }

exports.addComment = (comment) => {
    return db("comments").insert(comment, "comment_id").returning("*");
    }

exports.updateComment = (id, comment) => {
    return db("comments").where("comment_id", id).update(comment).returning("*");
    }

exports.deleteComment = (id) => {
    return db("comments").where("comment_id", id).del();
    }

exports.getCommentByUserId = (id) => {
    return db("comments").where("user_id", id);
    }

    
