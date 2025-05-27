const express = require("express");
import prisma from "../utils/prismaClient";
import {hashPassword, encryption} from "../utils/encryption";
import {generateAccessToken, authenticateToken} from "../utils/jwtToken";
import { hash } from "bcrypt";
const router = express.Router();

router.post("/signup", async (req,res) =>{
    try{
        const user = await prisma.user.find_unique({
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
                    name: name,
                    password: hashPassword(password)
                }
            });
            return res.sendStatus(201);
    }
    catch(e){
        return res.sendStatus(500).statusMessage({message:e});
    }
});

router.post("/signin", async (req,res) =>{
    try{
        const {username, password} = req.body;
        const user = await prisma.user.find_unique({
            where:{
                username: username
            }
        });
        if(!user){
            return res.sendStatus(404);
        }
        const token = await generateAccessToken(user);
    }
    catch(e){
        return res.sendStatus(500).statusMessage({message:e});
    }
})