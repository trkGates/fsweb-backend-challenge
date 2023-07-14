const db = require("../../data/db-config.js");

exports.getAllUsers = () => {
  return db("users");
};

exports.getUserById = (id) => {
  return db("users").where("user_id", id).first();
};

exports.getUserByUsername = (username) => {
  return db("users").where("username", username).first();
};

exports.addUser = (user) => {
  return db("users").insert(user, "user_id").returning("*");
};

exports.updateUser = (id, user) => {
  return db("users").where("user_id", id).update(user).returning("*");
};

exports.deleteUser = (id) => {
  return db("users").where("user_id", id).del();
};
