const express = require('express');
const router = require("express").Router();
const UserController = require("./../controllers/User.controller")
const { getAllOptimized } = UserController;

router.get("/", UserController.getAllUsers)

router.post("/", UserController.createUser)

router.put("/:id", UserController.updateUser)

router.delete("/:id", UserController.deleteUserById )

router.get('/users', UserController.getAllUsers);


module.exports = router;