const Contato = require('../MODELS/contatoModel')



exports.contatoControlerHome=(req,resp)=>{
    resp.render('contatos',{contato:{}})
}


exports.formularioRecebido=async (req,resp)=>{
    try{
    const contato = new Contato(req.body)
    await contato.Register()
    if(contato.Errors.length>0){
        req.flash('errors',contato.Errors)
        req.session.save(()=>resp.redirect('/contatos/index'))
        return;
    }

    req.flash('success','Usuario registrado!')
    req.session.save(()=>resp.redirect(`/contatos/index/${contato.contato._id}`))
    return;
 }catch(e){console.log (e);
    return resp.render('404')}
}

exports.editIndex= async (req,resp)=>{
    if(!req.params.id){
        return   resp.render('404')
    }
 const  contato = await Contato.buscaPorID(req.params.id)
 if(! contato){
  return  resp.render('404')
 }
 resp.render('contatos',{contato })
//  E O ID DO PARAMETRO BUSCA NA BASE O DADOS QUE TA NA URL DO POST
}
exports.deleteForm= async (req,resp)=>{
    if(!req.params.id){
        return   resp.render('404')
    }
 const  contato = await Contato.delete(req.params.id)
 if(! contato){
  return  resp.render('404')
 }
 req.flash('success','Usuario excluido!')
 req.session.save(()=>resp.redirect('/index'))
 return;

}
exports.EditForm=async (req,resp)=>{
  try{  if(!req.params.id){
        return   resp.render('404')
    }
    const  contato =new Contato(req.body)
    await contato.edit(req.params.id)
    if(contato.Errors.length>0){
        req.flash('errors',contato.Errors)
        req.session.save(()=>resp.redirect('/contatos/index'))
        return;
    }

    req.flash('success','Usuario editado!')
    req.session.save(()=>resp.redirect(`/contatos/index/${contato.contato._id}`))
    return;
 }catch(e){console.log (e);
return resp.render('404')}
}