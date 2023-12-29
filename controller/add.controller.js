const User = require('../models/user');
const Address = require('../models/address');

const userController = {
    addAddress:async(req,res)=>{
        try{
            const {userId} = req.params;
            const {location,street,city,pincode} = req.body;

            const users = await User.findById(userId);
            if(!users){
                return res.status(404).json({message:'user not found'});
            }
            const Addresss = new Address({
                location,street,city,pincode
            });

            users.addresses.push(Addresss);
            await Addresss.save();
            await users.save();
            res.status(201).json({message:'address add completed'})
        }catch(err){
            console.log(err);
            res.status(500).json({message:'server run out'});
        }
    },

    updateAddress:async(req,res)=>{
        try{
            const {userId,addressId} = req.params;
            const {location,street,city,pincode} = req.body;
            const users = await User.findById(userId);

            if(!users){
                return re.status(404).jjson({message:'user not found'})
            }
            const address = await Address.findById(addressId);

            if(!address){
                return res.status(404).json({message:'address not found'})
            }
            address.location = location;
            address.street = street;
            address.city = city;
            address.pincode = pincode;

            await address.save();
            res.status(204).json({message:"update address completed"})
        }catch(err){
            console.log(err);
            res.status(500).json({message:'inernal server error'})
        }
    }
}

module.exports = userController;