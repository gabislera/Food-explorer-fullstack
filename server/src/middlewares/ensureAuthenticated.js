const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization //busca o token de autorização

  if (!authHeader) {
    throw new AppError("JWT não informado", 401)
  }

  const [, token] = authHeader.split(" ") //["Bearer", "xxxxxx"] quebra o texto em um array e armazena a segunda posição em token

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) //verifica se o token é valido, retorna o sub e modifica o nome para user_id

    req.user = { //cria user.id dentro de request
      id: Number(user_id)
    }

    return next()
  } catch {
    throw new AppError("JWT inválido", 401)
  }
}

module.exports = ensureAuthenticated