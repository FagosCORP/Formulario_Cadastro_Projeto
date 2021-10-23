const mongoose = require('mongoose');
const validator = require('validator');
const ContatoSchema=new mongoose.Schema({
    nome:{type:String,required:true,default:'' },
    email:{type:String,required:false,default:''},
    telefone:{type:String,required:false,default:''},
    CriadoEm:{type:Date,default:Date.now}



    

})

const Contatomodel = mongoose.model('Contato',ContatoSchema)


function Contato(body){
    this.body=body;
    this.Errors=[];
    this.contato=null;

}
Contato.prototype.Register= async function(){
    this.valida();
    if(this.Errors.length>0){
        return
    }
this.contato= await   Contatomodel.create(this.body)
}
Contato.prototype.valida=function(){
    this.cleanUP();
    if(this.body.email && !validator.isEmail(this.body.email)){
        this.Errors.push('Email invalido!')
    }
   if(!this.body.nome){
       this.Errors.push('Preencha o nome!')
   }
   if(!this.body.nome && !this.body.telefone){
    this.Errors.push('Preencha pelo menos (E-mail ou telefone)')
    }
    if(!this.body.nome && !this.body.email){
        this.Errors.push('Preencha pelo menos (E-mail ou telefone)')
    }
}
Contato.prototype.edit=async function(id){
    if(typeof id !=='string'){
        return
    }
    this.valida()
    if(this.Errors.length>0){
        return
    }
    this.contato=await Contatomodel.findByIdAndUpdate(id,this.body,{new:true})
}
Contato.prototype.cleanUP=function(){
    for(let keys in this.body){
      if(typeof  this.body[keys] !=='string' ) {
          this.body[keys]='';
        }
    }
    this.body={
        nome:this.body.nome,
        email:this.body.email,
        telefone:this.body.telefone
        
    }
}
// STATICOS
Contato.buscaPorID= async function(id){
    if(typeof id !=='string'){
        return
    }
    const contato= await Contatomodel.findById(id)
     return contato
}
Contato.buscaClientes= async function(id){
    const contato= await Contatomodel.find(id).sort({CriadoEm:-1})
     return contato
}
Contato.delete= async function(id){
    if(typeof id !=='string'){return}
    const contato= await Contatomodel.findOneAndDelete({_id:id})
    return contato
}
module.exports=Contato