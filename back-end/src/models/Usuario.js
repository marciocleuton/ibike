const mongoose = require('mongoose');
const bcrypt = require('bcrypt')



const UsuarioSchema = new mongoose.Schema({
  
    nome: String,
    email: String,    
    idade: String,
    telefone : String,
    image: String,
    tipo: String,
    senha: String,
      }, {
    timestamps: true,
    });

    UsuarioSchema.pre('save' , function(next){
      if(!this.isModified('senha')){
        return next();
      }
      this.senha = bcrypt.hashSync(this.senha,10);
      next();
    })
    UsuarioSchema.pre('updateOne', function(next){
      var senha  = this.getUpdate().senha+'';
      if(senha.length<55)
      {
        this.getUpdate().senha = brypt.hashSync(this.senha,10);
      }
      next();
    })
    UsuarioSchema.methods.isCorrectPassword = function(passaword, callback ){
      bcrypt.compare(passaword, this.senha, function(err, same)
      {
        if(err){
          callback(err);
        }else{
          callback(err, same);
          console.log(same)
        }
      });
    }
  
    
const usuario = mongoose.model('User', UsuarioSchema);
module.exports = usuario;

