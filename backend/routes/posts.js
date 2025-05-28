import express from "express";
import upload  from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import { authenticateToken } from "../utils/jwtToken.js";
import prisma from "../utils/prismaClient.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

router.post('/createPost', upload.single('image'), async (req, res) => {
    try {
        // console.log(upload.resource_type)
        console.log(req.body.username)
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: `${req.body.username}/posts`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      const {heading,content,username} = req.body;
      const post = await prisma.post.create({
        data:{
            heading: heading,
            content: content,
            authorId: username,
            imageUrl: result.secure_url
        }
      });
      res.status(200).json({"Message":"Successfuly Posted"});
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });


export const PostRouter = router;
