const db = require("../../data/db-config.js");

exports.getAllPosts = () => {
    return db("posts");
    }

exports.getPostById = (id) => {
    return db("posts").where("post_id", id).first();
    }

exports.addPost = (post) => {
    return db("posts").insert(post, "post_id").returning("*");
    }

exports.updatePost = (id, post) => {
    return db("posts").where("post_id", id).update(post).returning("*");
    }

exports.deletePost = (id) => {
    return db("posts").where("post_id", id).del();
    }

exports.getPostByUserId = (id) => {
    return db("posts").where("user_id", id);
    }
    


