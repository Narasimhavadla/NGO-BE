const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


exports.register = async (req,res) =>{
    try{
        const {username,password,phone,role} = req.body

        if(!username || !password || !role){
            return res.status(400).send({
                status : false,
                message : "Username and Password Required"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await req.userModel.create({
            username ,
            password : hashedPassword,
            phone,
            role
        })

        res.status(201).send({
            status : true,
            message : "User Redisterd Succesfully",
            data : user
        })

    }
    catch(err){
        if(err.name === "SequelizeUniqueConstraintError"){
            res.status(400).send({
                status : false,
                message : "User Already Exist"
            })
        }
        res.status(500).send({
            status : false,
            message :"Failed To register"
        })
    }
}


exports.login = async (req,res) =>{
    try{
        const {username,password} = req.body


        if(!username || !password){
            return res.status(401).send({
                status : false,
                message : "username and password required"
            })
        }

        const user = await req.userModel.findOne({
            where : {username},
        })

        if(!user){
            return res.status(401).send({
                status : false,
                message : "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).send({
                status : false,
                message : "Invalid Credentials"
            }
            )
        }

        const token = jwt.sign({
            id : user.id,
            username : user.username,
            role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1h"
            }
    )

            res.status(200).send({
                status : true,
                message : "Login Succesfull",
                token,
                user : {
                    id : user.id,
                    username : user.username,
                    role : user.role

                }
            })

    }
    catch(err){
        res.status(500).send({
            status : false,
            message : "Failed to Login"
        })
    }
}