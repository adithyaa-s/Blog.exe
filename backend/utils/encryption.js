const bcrypt = require("bcrypt")
const saltRounds = 10;

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(dbPassword, hashedPassword) {
    const match = await bcrypt.compare(dbPassword, hashedPassword);
    return match;
}

module.exports = {hashPassword, comparePassword};
