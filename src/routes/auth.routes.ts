import { Router } from 'express';
import { STATUS_CODES } from 'http';
import { loginUser, registerUser } from '../services/auth.service';
import { authenticate } from '../middlewares/auth.middleware';

export const authRouter = Router()

authRouter.post("/register",async(req, res, next)=>{
    try{
        const {email, password} = req.body

        //not writing service logic here
        //service login- servicefile
        await registerUser(email, password);
        res.status(201).json({
            success: true,
            message: "Registration succcessful, please log in to continue"
        })
    }catch(error){
        next(error)
    }
});


authRouter.post("/login", async(req,res,next)=>{
    try{
        const {email,password} = req.body;

        const {accessToken} = await loginUser(email, password)

        res.status(200).json({
            success: true,
            data: {accessToken},
        });
    }catch(error){
        next(error)
    }
});

//get my current user information
// protect your routes
authRouter.get("/me", authenticate,(req,res)=>{ ///the authenticate work as middleware and protect our data, if the usr authorize this pas and giv data if not return an error
    res.status(200).json({
        success: true,
        data: {
            user: req.user,
        },
    });
});