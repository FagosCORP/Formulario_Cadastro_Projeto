const Contato = require('../MODELS/contatoModel')
const { buscaClientes } = require('../MODELS/contatoModel')

exports.Logininit= async(req,resp)=>{
    const contatos= await  Contato.buscaClientes()
    resp.render('index',{contatos} )
}
