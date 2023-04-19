import mongoose from "mongoose";
const adminSchema =new mongoose.Schema({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
       },
       email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
        validate:{
           isEmail:true
        }
       },
       password:{
        type:DataTypes.STRING(16),
        allowNull:false
    }
    
})


export default Admin = mongoose.model("admin", adminSchema);