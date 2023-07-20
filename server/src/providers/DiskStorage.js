const fs = require("fs")
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(     //muda o arquivo de lugar
      path.resolve(uploadConfig.TMP_FOLDER, file), //resolve o caminho do arquivo de acordo com cada sistema operacional
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //usa o path.resolve para acessar a pasta do arquivo

    try {
      await fs.promises.stat(filePath) //retorna o estado do arquivo: aberto, corrompido, disponivel
    } catch {
      return
    }

    await fs.promises.unlink(filePath) //remove o arquivo
  }
}

module.exports = DiskStorage