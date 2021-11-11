const Produto = require('../models/Produto');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');


module.exports ={
    async index(req,res){
        const produto = await Produto.find().sort('-createdAt');

        return res.json(produto);

    },

    async index2(req,res){
        debugger;
        const produto = await Produto.findById(req.params.id);

        return res.json(produto);
      
        
    },
    async delete(req,res){
        debugger;
        const produto = await Produto.findByIdAndDelete(req.params.id);

        return res.json(produto);

    },

    async atualizar(req,res){
        debugger;

        const {_id ,nome,email ,idade, telefone} = req.body;
       
        data = { nome,email ,idade, telefone}
       
        const produto = await Produto.updateOne({_id}, data)
       
        //usuario[index] = nome; // sobrepõe o index obtido na rota de acordo com o novo valor
        

     

        return res.json(produto);

    },
    async checkToken(req, res){
        const token = req.body
        
        const t = token.params.token;
        //console.log(t)
        if(!token){
            res.json({ status:401, msg:'Não autorizado: Tokne inexisten'});
        }else{
            jwt.verify(t, secret, function(err, decoded){
                if(err){
                   // console.log(err);
                    res.json({status:401, msg: 'Não Autorização'});
                }else{
                    res.json({status:200})
                }
            })
        }

       
      
    },
    
    async store(req, res){

       const {nome,categoria ,preco, descricao} = req.body;
       const {originalname: image, key, location: url="" } = req.file;
    
        console.log(req.file)
       const [name] = key.split('.');
    
       const filename = `${name}.jpg`
        /*
       await sharp(req.file.path)
       .resize(500)
       .jpeg({ quality : 70 })
       .toFile(
           path.resolve(req.file.destination, 'resized', filename)
           )
           fs.unlinkSync(req.file.path);
        */
console.log(key)
    const produto = await Produto.create({
        nome,
        categoria,
        preco ,
        descricao,   
        image,
        key,
        url
       });

       req.io.emit('produto', produto);

        return res.json(produto);
    },
  
   



}
