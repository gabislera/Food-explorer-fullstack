const { Router } = require("express")
const UserControllers = require("../controllers/UserController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userController = new UserControllers()
const usersRoutes = Router()

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update)

module.exports = usersRoutes
