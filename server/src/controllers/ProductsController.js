const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class ProductController {
  async create(req, res) {
    const { name, description, category, price, ingredients } = req.body
    const user_id = req.user.id
    const image = req.file.filename

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(image)

    const [product_id] = await knex("products").insert({
      name,
      description,
      category,
      price,
      image: filename
    })

    const ingredientsArray = JSON.parse(ingredients)

    const ingredientsInsert = ingredientsArray.map(name => {
      return {
        name,
        product_id,
        user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const product = await knex('products').where({ id }).first()
    const ingredients = await knex('ingredients').where({ product_id: id }).orderBy('name')

    return res.json({ ...product, ingredients })
  }

  async index(req, res) {
    const products = await knex('products')

    return res.json({ products })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('products').where({ id }).delete()

    return res.json()
  }

}

module.exports = ProductController