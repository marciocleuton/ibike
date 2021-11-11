const Book = require('../models/Book');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports ={
    async index(req,res){
        const books = await Book.find().sort('-createdAt');

        return res.json(books);

    },

    async store(req, res){

       const {autor ,titulo ,preco, descricao} = req.body;
       const {filename: image } = req.file;

       const [name] = image.split('.');
    
       const filename = `${name}.jpg`

       await sharp(req.file.path)
       .resize(500)
       .jpeg({ quality : 70 })
       .toFile(
           path.resolve(req.file.destination, 'resized', filename)
           )
           fs.unlinkSync(req.file.path);
        
       const books = await Book.create({
        autor ,
        titulo ,
        preco, 
        descricao,
         image: filename,
       });

       req.io.emit('books', books);

        return res.json(books);
    }


}

