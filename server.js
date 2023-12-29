const dotenv = require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const port = 6000 || process.env.port;
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.Promise = global.Promise;

mongoose.connect(process.env.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

  
  app.get("/", (req, res) => {
    res.json({ message: "hello user api task" });
  });
    
const usersroute = require("./routes/user.route");
app.use("/user", usersroute);

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})