
try{
exports.LoginIndex=(req,resp)=>{
    if(req.session.user){
        return resp.render('index-logado')
    }
    return resp.render('login')
    
}

exports.Loginlogout=(req,resp)=>{
    req.session.destroy()
    resp.redirect('/')
    return;
}
// MANDEI PELO ERRORS UM DO FLASH NO 
// LOGIN PARA O MIDLEWARE QUE VAI PASSAR PELO ERROR.ejs

// AGORA TAMO PEGANDO O LOGIN MODEL PARA USAR A SENHA EMAIL E CSRF
const Login= require('../MODELS/loginModel')
exports.LoginRegister= async(req,resp)=>{
   try{
    const loginAfter= new Login(req.body)
   await loginAfter.register()
   if(loginAfter.Errors.length>0){
       req.flash('errors',loginAfter.Errors)
       req.session.save(function() {
           return resp.redirect('back')
       })
       return;
   }

   req.flash('success','Cadastro realizado!')
       req.session.save(function() {
           return resp.redirect('back')
       })
       return;
}catch(e){console.log(e)
     return resp.render('404')}


}
// AGORA A FUNC DO REDIRECT CRIADA NO MODEL

exports.LoginRedirect=async(req,resp)=>{ try{
    const loginAfter= new Login(req.body)
   await loginAfter.LoginRedirect()
   if(loginAfter.Errors.length>0){
       req.flash('errors',loginAfter.Errors)
       req.session.save(function() {
           return resp.redirect('back')
       })
       return;
   }

   req.flash('success',`Seja bem-vindo de volta!`)
   req.session.user=loginAfter.user
       req.session.save(function() {
           return resp.redirect('back')
       })
       return;
}catch(e){console.log(e)
     return resp.render('404')}

}
}catch(e){console.log(e)
return resp.render('404')}