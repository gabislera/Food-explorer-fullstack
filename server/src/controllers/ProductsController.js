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

  async update(req, res) {
    const { id } = req.params;
    const { name, description, category, price, ingredients } = req.body;
    const image = req.file?.filename
    const user_id = req.user.id

    let filename;

    if (image) {
      const diskStorage = new DiskStorage()
      filename = await diskStorage.saveFile(image)
    }

    // Atualize os dados do produto na tabela "products"
    await knex("products")
      .where({ id })
      .update({
        name,
        description,
        category,
        price,
        image: filename
      });

    // Atualize os ingredientes associados ao produto na tabela "ingredients"
    const ingredientsArray = JSON.parse(ingredients);

    // Primeiro, exclua todos os ingredientes associados ao produto
    await knex("ingredients").where({ product_id: id }).delete();

    // Em seguida, insira os novos ingredientes atualizados
    const ingredientsInsert = ingredientsArray.map((name) => {
      return {
        name,
        product_id: id,
        user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return res.json({ message: "Produto atualizado com sucesso." });
  }

  async show(req, res) {
    const { id } = req.params

    const product = await knex('products').where({ id }).first()
    const ingredients = await knex('ingredients').where({ product_id: id }).orderBy('name')

    return res.json({ ...product, ingredients })
  }

  async index(req, res) {
    const { name } = req.query

    // const products = await knex('products').whereLike('name', `%${name}%`)
    const products = await knex('products')
      .leftJoin('ingredients', 'products.id', 'ingredients.product_id')
      .where(function () {
        this.where('products.name', 'like', `%${name}%`)
          .orWhere('ingredients.name', 'like', `%${name}%`);
      })
      .select('products.*')
      .distinct();

    return res.json({ products })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('products').where({ id }).delete()

    return res.json()
  }

}

module.exports = ProductController