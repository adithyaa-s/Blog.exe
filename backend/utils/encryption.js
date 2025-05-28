import bcrypt from "bcrypt";
const saltRounds = 10;

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(plainTextPassword, hashedPassword) {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
}


export {hashPassword, comparePassword};
