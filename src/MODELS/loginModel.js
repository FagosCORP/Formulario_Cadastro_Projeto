const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs= require('bcryptjs')
const loginSchema=new mongoose.Schema({
   email:{type:String,required:true},
   password:{type:String,required:true}

})

const loginmodel = mongoose.model('login',loginSchema)


class Login{
constructor(body){
    this.body=body;
    this.Errors=[];
    this.user=null;
}
async LoginRedirect(){
    this.valida()
    if(this.Errors.length>0)return;
    this.user=await loginmodel.findOne({email:this.body.email})
    if(!this.user){this.Errors.push('Usuario nao encontrado!')
     return;

}


   if(!bcryptjs.compareSync(this.body.password,this.user.password)){
         this.Errors.push('Senha invalida!');
         this.user=null;
         return;

     }


}














// NA PARTE DO REGISTER
 async register(){
this.valida()
if(this.Errors.length>0)return;
await  this.UserExist();
if(this.Errors.length>0)return;

    // CHECK DO SALT PARA CRIPTOGRAFAR A SENHA
 const salt = bcryptjs.genSaltSync();
this.body.password=bcryptjs.hashSync(this.body.password,salt)   
this.user=await loginmodel.create(this.body)

}

 async UserExist(){
 this.user =await loginmodel.findOne({email:this.body.email})
           if(this.user){
               this.Errors.push('Usuario ja cadastrado')
           }
         
}
valida(){
    this.cleanUP();
    if(!validator.isEmail(this.body.email)){
        this.Errors.push('Email invalido!')
    }
    if(this.body.password.length<3||this.body.password.length>=12){
        this.Errors.push('Senha invalida')
    }
}
// UMA FUNCAO TA CHAMANDO A OUTRA
cleanUP(){
    for(let keys in this.body){
      if(typeof  this.body[keys] !=='string' ) {
          this.body[keys]='';
      }
    }
    this.body={
        email:this.body.email,
        password:this.body.password
    }
}
}
module.exports=Login



// TINHA QUE TER ALTERADO O USER 