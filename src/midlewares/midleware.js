exports.midleGlobal=(req,resp,next)=>{
resp.locals.errors=req.flash('errors')
resp.locals.success=req.flash('success')
resp.locals.user= req.session.user
next();
}
// FUNCAO QUE USA EM TODOS
// MIDLEWARES
exports.checkCsrfError=(error,req,resp,next)=>{
    if(error ){
        return resp.render('404')
    }
    next();
}
exports.csfrMidleware=(req,resp,next)=>{
    resp.locals.csrfToken=req.csrfToken()
    next();
}
exports.LoginRequired=(req,resp,next)=>{
    if(!req.session.user){
        req.flash('errors','Por favor, efetue o login para continuar!')
        req.session.save(()=>resp.redirect('/'))
        return;
    }
    next();
}