const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    location:{
        type:String,
        enum:['home', 'office', 'college'],
        required:true,
    },
    street:String,
    city:String,
    pincode:String
});
module.exports = mongoose.model('Address',addressSchema);