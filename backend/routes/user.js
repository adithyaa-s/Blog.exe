import express from "express";
import prisma from "../utils/prismaClient.js"

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
  

router.get("/:id", async (req,res) =>{
    try{
        const username = req.params.id;
        const user = await prisma.user.findUnique({
            where:{
                username: username
            },
            include: {
                posts: true,
                followers: true,
                following: true
              }
        });
        if(!user){
            return res.sendStatus(404);
        }
        const userDetails = {
            username: user.username,
            name: user.name,
            posts: user.posts,
            profileImageUrl: user.profileImageUrl,
            followers: user.followers,
            following: user.following
          };
        return res.status(200).json({userDetails});
    }catch(error){
        return res.status(500).json({"error":"Error Occured"});
    }
});

export const UserRouter = router;