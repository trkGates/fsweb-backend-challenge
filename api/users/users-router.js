const express = require("express");
const router = express.Router();

const usersModel = require("./users-model");

router.get("/", async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await usersModel.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await usersModel.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await usersModel.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await usersModel.deleteUser(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(deletedUser);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
