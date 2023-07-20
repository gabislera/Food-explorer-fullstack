const knex = require("../database/knex")

class IngredientsController {
  async create(req, res) {
    const { name } = req.body

    await knex("ingredients").insert({ name })

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const ingredient = await knex("ingredients").where({ id })

    return res.json({ ingredient })
  }

}

module.exports = IngredientsController