

const mongoose = require('mongoose');
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");


const s3 = new aws.S3();


const Produtochema = new mongoose.Schema({
    nome: String,
    categoria: String,
    preco : String,
    descricao: String,
    nomeImagem: String,
    size: Number,
    key: String,
    url: String,
    image: String,
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('produto', Produtochema);