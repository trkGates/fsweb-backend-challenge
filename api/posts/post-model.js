const db = require("../../data/db-config.js");

function getAllPosts(){
    return db("posts");
    }

    function getPostById  (id)  {
    return db("posts").where("post_id", id).first();
    }

    function addPost (post) {
    return db("posts").insert(post, "post_id").returning("*");
    }

    function updatePost  (id, post) {
    return db("posts").where("post_id", id).update(post).returning("*");
    }

    function deletePost  (id)  {
    return db("posts").where("post_id", id).del();
    }

    function getPostByUserId  (id)  {
    return db("posts").where("user_id", id);
    }
    

    async function incrementLikeCount(post_id) {
        try {
          await db("posts")
            .where("post_id", post_id)
            .increment("like_sayisi", 1);
        } catch (error) {
          throw error;
        }
      }

      async function decrementLikeCount(post_id) {
        try {
          await db("posts")
            .where("post_id", post_id)
            .decrement("like_sayisi", 1);
        } catch (error) {
          throw error;
        }
      }

      module.exports = {
        getAllPosts,
        getPostById,
        addPost,
        updatePost,
        deletePost,
        getPostByUserId,
        incrementLikeCount, // Yeni eklediğimiz fonksiyonu burada da export ediyoruz.
        decrementLikeCount,
      };


