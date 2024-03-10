const router = require("express").Router();
const UserController = require("./../controllers/User.controller")

router.get("/", UserController.getAllUsers)

router.post("/", UserController.createUser)

module.exports = router;