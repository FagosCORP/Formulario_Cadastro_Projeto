const mongoose = require('mongoose');
const homeSchema=new mongoose.Schema({
    titulo:{type:String,required:true}
    ,description: String,

})

const Homemodel = mongoose.model('Home',homeSchema)


module.exports=Homemodel