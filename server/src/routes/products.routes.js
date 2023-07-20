const { Router } = require("express")
const ProductsController = require("../controllers/ProductsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const productController = new ProductsController()
const upload = multer(uploadConfig.MULTER)

const productsRoutes = Router()

// productsRoutes.use(ensureAuthenticated)

productsRoutes.post("/", ensureAuthenticated, upload.single("image"), productController.create)
productsRoutes.get("/:id", productController.show)
productsRoutes.delete("/:id", ensureAuthenticated, productController.delete)
productsRoutes.get("/", productController.index)

module.exports = productsRoutes
