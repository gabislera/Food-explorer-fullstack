const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require('bcrypt')

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex("users").where({ email }).first()

    if (checkUserExists) {
      throw new AppError("Este email ja está em uso", 401)
    }

    const hashedPassword = await hash(password, 8)

    const user = {
      name,
      email,
      password: hashedPassword
    }

    await knex("users").insert(user)

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const id = req.user.id

    const user = await knex("users").where({ id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado", 401)
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).first()

    if (userWithUpdatedEmail && userWithUpdatedEmail.id != id) { //arrumar string X number
      throw new AppError("Este email ja está em uso", 401)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) { // digitou a senha nova mas nao digitou a senha antiga
      throw new AppError("Informe a senha antiga")
    }

    if (password && old_password) { // se password e old password foram informados...
      const checkOldPassword = await compare(old_password, user.password) // compara senha nova com senha antiga

      if (!checkOldPassword) {
        throw new AppError("Senha não confere")
      }

      user.password = await hash(password, 8)
      user.updated_at = Date.now() //modificar padrao do datetime
    }

    await knex("users").where({ id }).update(user)

    return res.status(200).json()
  }
}

module.exports = UserController