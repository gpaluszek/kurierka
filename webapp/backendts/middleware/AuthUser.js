import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Proszę zaloguj się do swojego konta!"});
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Użytkownik nie został znaleziony"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) =>{
    
    const user = await prisma.user.findUnique({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Użytkownik nie został znaleziony"});
    if(user.role !== "admin") return res.status(403).json({msg: "Dostęp zabroniony"});
    next();
}