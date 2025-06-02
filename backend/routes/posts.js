import express from "express";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import { authenticateToken } from "../utils/jwtToken.js";
import prisma from "../utils/prismaClient.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

router.post("/createPost", authenticateToken, upload.single("image"), async (req, res) => {
  const userId = req.user.id;
  const { heading, content } = req.body;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: `${req.user.username}/posts`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      const post = await tx.post.create({
        data: {
          heading,
          content,
          authorId: userId,
          imageUrl: cloudinaryResult.secure_url,
        },
      });
      res.status(200).json({ Message: "Successfuly Posted" });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/getPosts",authenticateToken, async (req, res) => {
  try {
    const token = req.user;
    const userId = token.id;
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { username: true, name: true } },
        comments: true,
        likes: {
          select: {
            userId: true
          }
        },
      },
      orderBy: { id: "desc" },
    });
    const modifiedPosts = posts.map(post => ({
      ...post,
      likedByCurrentUser: post.likes.some(like => like.userId === userId)
    }));
    return res.json(modifiedPosts);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
});

router.post("/:postId/like", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    await prisma.like.create({
      data: { postId, userId },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post("/:postId/comment",authenticateToken, async (req, res) => {
  const  userId = req.user.id;
  const {content } = req.body;
  const postId = req.params.postId;
  try {
    const comment = await prisma.comment.create({
      data: { postId, authorId: userId, content },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete('/:postId', authenticateToken, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    const post = await prisma.post.findUnique({ where: { id: postId } });
  
    if (!post || post.authorId !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }
  
    await prisma.post.delete({ where: { id: postId } });
    res.status(200).json({ message: 'Post deleted' });
  });

router.delete("/:postId/like", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    await prisma.like.deleteMany({
      where: {
        postId,
        userId,
      },
    });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

export const PostRouter = router;
