const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp") //pasta temporaria
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") //pasta de uploads

const MULTER = { //biblioteca utilizada para fazer o upload de imagens
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex") //cria um filename unico para evitar sobrescrição de arquivos
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}