import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function generateAccessToken(user) {
  return jwt.sign(user, SECRET_TOKEN, { expiresIn: "1h" });
}

async function authenticateToken(req, res, next) {
    const token =
    req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

export { generateAccessToken, authenticateToken };
