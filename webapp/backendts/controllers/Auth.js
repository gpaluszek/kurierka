import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import argon2 from "argon2";


export const Login = async (req, res) =>{
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "Użytkownik nie został znaleziony"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Błędne hasło"});
    req.session.userId = user.id;
    const uid = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;


    res.status(200).json({uid, name, email, role});
}
export const Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Proszę zalogować się na swoje konto!"});
    }
    const user = await prisma.user.findUnique({
        select: {
            name: true,
            surname: true,
            street: true,
            houseNumber: true,
            city: true,
            postCode: true,
            sex: true,
            phoneNumber: true,
            email: true,
            role: true,
            status: true,
            password: true
        },
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Użytkownik nie został znaleziony"});
    res.status(200).json(user);

}


export const logOut = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Nie można się wylogować"});
        res.status(200).json({msg: "Zostałeś wylogowany"});
    });
}