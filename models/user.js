const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true, "email must needed"]
    },
    password:{
        type:String,
        required:[true, "password must req"]
    },
    isactive:{
        type:Boolean,
        default:false
    },
    addresses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
        },
    ],
});

const user = new mongoose.model("User", schema);

module.exports = user;