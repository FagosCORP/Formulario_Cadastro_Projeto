import validator from "validator";
export default class FormCadastro{
    constructor(formulario){
    this.formulario=document.querySelector(formulario);
    this.Erros=[];
}
init(){
    this.events()
}
events(){
    if(!this.formulario){return;}
    this.formulario.addEventListener('submit',clickEnviar=>{
         clickEnviar.preventDefault()
         const enviar=clickEnviar;
         this.validate(clickEnviar)
         if(this.Erros.length<=0){
             click.submit()
         }
    })

}
validate(clickEnviar){
    let click=clickEnviar.target;
    const Emailinput=click.querySelector('input[name="email"]')
    const passwordinput=click.querySelector('input[name="password"]')
    if(!validator.isEmail(Emailinput.value)){ this.Erros.push("Email invalido!")
    let el = document.createElement("span");
    el.innerText='Email invalido!'
    this.insertAfter(Emailinput,el)
    const spans=this.formulario.querySelectorAll('span')
if(spans.length>1){
for(let span of spans){
    span.remove()
    
}}

}
else if(typeof passwordinput.value !=='string'|| passwordinput.value.length<=3 ){this.Erros.push("Sua senha deve possuir de 3 a 20 (LETRAS E NUMEROS)")
let el = document.createElement("span");
el.innerText='Sua senha deve possuir de 3 a 20 (LETRAS E NUMEROS)'
this.insertAfter(passwordinput,el)
const spans=this.formulario.querySelectorAll('span')

for(let span of spans){
    if(spans.length>2){
    span.remove()}
  
}


}

else{click.submit() }
}
insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }



}




