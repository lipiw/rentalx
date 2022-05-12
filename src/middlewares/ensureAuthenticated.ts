import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, nextFunction: NextFunction){

    //Pegando token do headers
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    //Bearer 4123123foia412313
    //Pegando apenas o token na segunda posição
    const [, token] = authHeader.split(" ");

    try{
        //Verificando token com aquela mesma palavra chave
        //sub é o objeto retornado por verify
        const { sub: user_id } = verify(token, "a2b655df9a424a124b62bfbdab67284d") as IPayload;
        
        const userRepository = new UserRepository();

        const user = userRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists!", 401);
        }

        request.user ={
            id: user_id
        }

        nextFunction();
    }catch{
        throw new AppError("Invalid token.", 401);
    }
}