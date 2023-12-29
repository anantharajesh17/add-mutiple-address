const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const user = require("../models/user");

//register
const register = async (req, res) => {
    if (!req.body.email && !req.body.password) {
      res.status(400).json({ message: "Content can not be empty!" });
    }
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 18);
  
    const User = new UserModel({ email, password: hashedPassword,isactive:true});
    // Generate a JWT token
    const token = jwt.sign({ email:email }, 'ananth');
  
    User.token = token;
  
    await User.save()
      .then((data) => {
        res.send({
          message: "User created successfully!!",
          user: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating user",
        });
      });
  };

const login = async (req, res) => {
  try {
    const { email , password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    //jwt
    const token = jwt.sign({id:user.id}, 'this-is-my-sercret-1234', { expiresIn: '1h' });
    res.json({token})
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//   
  module.exports ={ register, login}