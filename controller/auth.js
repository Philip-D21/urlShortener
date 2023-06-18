const User = require('../models/user');


const register = async(req,res)=>{

    const {
        username, email, password
    }= req.body 

    const userExist = await User.findOne({ email: email})
      if(userExist){
          return res.status(409).json({ 
            status: "failed",
            message: 'email already exist in the database'
        })
    }
 // Hash the password
 const hashedPassword = await bcrypt.hash(password, 10);

     try{
           const newUser = await User.create({
                username,
                email,
                password: hashedPassword
           })

        res.status(201).json({
            status: "success",
            result: newUser
        })
     }catch(err){
        return res.status(500).json({
            message: err.message
        })
     }
}

const login = async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}






module.exports = {
    register,
    login,
}