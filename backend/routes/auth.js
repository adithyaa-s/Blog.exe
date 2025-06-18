import express from "express";
import prisma from "../utils/prismaClient.js";
import {hashPassword, comparePassword} from "../utils/encryption.js";
import {generateAccessToken, authenticateToken} from "../utils/jwtToken.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

router.post("/signup", async (req,res) =>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                username: req.body.username
            }
        })
        if(user){
            return res.status(400).json({"Message":"User Already Exists"});
        }
        const {name, username, email, password} = req.body;
            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    name: name || "Test",
                    password: await hashPassword(password)
                }
            });
            return res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500);
    }
});

router.post("/signin", async (req,res) =>{
    try{
        const {email, username, password} = req.body;
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:email},
                    {username:username}
                ]
            }
        });
        if(!user){
            return res.sendStatus(404);
        }if(!( await comparePassword(password,user.password))){
            return res.status(401).json({Message:"Invalid Credentials"});
        }
        const tokenData = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl
            }
        const token = await generateAccessToken(tokenData);
        res.cookie("token",token);
        return res.json({token});
    }
    catch(e){
        console.log(e)
        return res.sendStatus(500);
    }
})

export const AuthRouter = router;