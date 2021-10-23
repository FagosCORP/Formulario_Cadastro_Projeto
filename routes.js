const express=require('express')
const route= express.Router();
module.exports=route
// CONTROLERS
const {Logininit}= require('./src/controllers/homeController')
const {LoginRequired}= require('./src/midlewares/midleware')
const {contatoControlerHome,formularioRecebido,editIndex,EditForm,deleteForm}= require('./src/controllers/contatoControler')
const {LoginIndex,LoginRegister,LoginRedirect,Loginlogout}= require('./src/controllers/logincontroller')
route.get('/',LoginIndex)
route.get('/index',Logininit)
// LOGINS
route.post('/login/register',LoginRegister)
route.post('/login/redirect',LoginRedirect)
route.get('/login/logout',Loginlogout )
route.get ('/contatos/index',LoginRequired,contatoControlerHome)
route.post('/contatos/register',formularioRecebido)
route.get ('/contatos/index/:id',LoginRequired,editIndex)
route.post('/contatos/edit/:id',LoginRequired,EditForm)
route.get('/contatos/delete/:id',LoginRequired,deleteForm)