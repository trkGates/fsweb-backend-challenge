const express = require("express");
const router = express.Router();

const usersModel = require("./users-model");

router.get("/", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    const { username, password, email, avatar } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!avatar) {
      return res.status(400).json({ message: "Avatar is required" });
    }
    const newUser = await usersModel.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const kullanciVarmi = await usersModel.getUserById(req.params.id);
    const updatedUser = await usersModel.updateUser(req.params.id, req.body);
    if (!kullanciVarmi) {
      res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const silinenKullanici = await usersModel.getUserById(req.params.id);
    const deletedUser = await usersModel.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "Kullanıcı bulunamaedı!..." });
    } else {
      res.status(200).json(silinenKullanici);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
