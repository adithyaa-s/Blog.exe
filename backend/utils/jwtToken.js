import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function generateAccessToken(user) {
    return jwt.sign(user, SECRET_TOKEN, { expiresIn: '1h' });
}

async function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1]
    if (!token)  return res.sendStatus(401);
    await jwt.verify(token, SECRET_TOKEN, (err,user) =>{
        console.log(err);
        if(err){
            res.clearCookie("token");
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

export {generateAccessToken, authenticateToken};