const {mongoose} = require('../db')

const produtoSchema = new mongoose.Schema({
    nome: String,
    preco: String,
    quantidade: String
})

const Produto = mongoose.model("Produto", produtoSchema)

module.exports = Produto
