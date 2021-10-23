import './style.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import FormCadastro from './modules/FormCadastro' 
const login = new FormCadastro('.Form-cadastro')
login.init();