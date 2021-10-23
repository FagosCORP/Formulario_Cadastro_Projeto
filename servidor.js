require('dotenv').config();
const express= require('express');
const app= express();
const routes=require('./routes');
const path= require('path');
const helmet = require('helmet')
const csrf= require('csurf')
const {midleGlobal,checkCsrfError,csfrMidleware}=require('./src/midlewares/midleware')
const mongoose = require('mongoose')

const session=require('express-session');
const MongoStore=require('connect-mongo') ;
const flashStore= require('connect-flash');
const csurf = require('csurf');
app.use(helmet())
app.use(session({
    secret:'senhasenhasenha',
    store:MongoStore.create({mongoUrl:process.env.CONNECTIONSTRING}),
    resave:false,
    saveUninitialized:false
,cookie:{
    maxAge:1000*60*60*24*7,
    httpOnly:true
}
}))
app.use(flashStore())

 mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit('pronto')
}).catch(e=>console.log(e))
app.use(express.urlencoded({extended:true}))
// NOSSO MIDLEWARE
// CSRF
// HELMET

app.use(csrf())
app.use(midleGlobal)
app.use(checkCsrfError)
app.use(csfrMidleware)
app.use(routes)
app.use(express.static(path.resolve(__dirname,'public')))
app.set('views',path.resolve(__dirname,'src','views'))
app.set('view engine','ejs')



app.on('pronto',()=>{
    app.listen(3000,()=> { console.log('servidor na porta 3000'), console.log('http://localhost:3000')})
})
//

