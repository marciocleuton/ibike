const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    autor: String,
    titulo: String,
    preco : String,
    descricao: String,
    image: String,
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', BookSchema);