const User = require('../models/Usuario');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const secret ="mySecret";

module.exports ={
    async index(req,res){
        const usuario = await User.find().sort('-createdAt');

        return res.json(usuario);

    },

    async index2(req,res){
        debugger;
        const usuario = await User.findById(req.params.id);

        return res.json(usuario);
      
        
    },
    async delete(req,res){
        debugger;
        const usuario = await User.findByIdAndDelete(req.params.id);

        return res.json(usuario);

    },

    async atualizar(req,res){
        debugger;

        const {_id ,nome,email ,idade, telefone} = req.body;
       
        data = { nome,email ,idade, telefone}
       
        const usuario = await User.updateOne({_id}, data)
       
        //usuario[index] = nome; // sobrepõe o index obtido na rota de acordo com o novo valor
        

     

        return res.json(usuario);

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

       const {nome,email ,idade, telefone, senha, tipo,  image} = req.body;
       //const {file: image } = req.file;

      const user = await User.create({
        nome,
        email ,
        idade,
         telefone,
         senha,
         tipo,
         image: image,
       });

       req.io.emit('user', user);

        return res.json(user);
    },
    async destroyToken(req, res){

         const token = req.headers;

         const t = headers.token;
        console.log(t)
         if(token){
             res.cookie('token', null,{httpOnly:true});
         }else{
             res.status(401).send("Logaut não Autorizado")

         }

         res.send("Sessão Finalizada com Sucesso")

    },

    async login(req, res){

        const {email , senha} = req.body;
      
        const usuario = await User.findOne({email: email}, function(err, use){
           console.log(use)
            if (err){
                console.log(err);
                res.status(200).json({erro:"Erro ao acessar o servido"})
            }else if(!use){
                res.status(200).json({status:2 , erro:"Email e senha não encontrados"})
   
            }
            else{
                              
                use.isCorrectPassword(senha, async function(err,same){
                    if(err){
                        res.status(200).json({erro:"Erro ao acessar o servido"})
                    }else if(!same){
                        res.status(200).json({status:2 , erro:"Senha Incorreta"})
                    }else{
                        const payload={email};
                        const token = jwt.sign(payload, secret,{
                    expiresIn:'3h'
                });
                res.cookie('token', token, {httpOnly: true});
                res.status(200).json({status:1 , auth:true, token:token, _id :usuario._id, nome: usuario.nome})
   

                    }
                })
                
            }
        })

    }



}

