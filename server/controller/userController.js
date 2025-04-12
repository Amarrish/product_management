import { users } from '../model/userSchema.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const saltRounds = 10;

export const userController = {
    register: async (req, res) => {
        const {username,email,password} = req.body; 

        try {
            const existingUser = await users.findOne({ email });
            if (existingUser) {
                res.status(406).json("User already exists. Please check!!!");
            } else {
                // register user
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = new users({
                username,
                email,
                password: hashedPassword,
                });

                await newUser.save();
                res.status(200).json(newUser);
            }
        } catch (err) {
            res.status(401).json(`Error!!! Transaction failed: ${err}`);
        }
    }
};

// login
export const userloginController = {
    login: async (req, res) => {
      const { email, password } = req.body;

      try{
        
        const existingUser = await users.findOne({email})
        if(existingUser && await bcrypt.compare(password, existingUser.password)){
            // generate token
            const token = jwt.sign({userId:existingUser._id},"superSecretKey123")
            res.status(200).json({
                existingUser,
                token:token
            })
        }else{
            res.status(404).json("incorrect email / password")
        }
    }catch(err){
        res.status(401).json(`Error!!! transaction failed: ${err}`)
    }
    },
  };
