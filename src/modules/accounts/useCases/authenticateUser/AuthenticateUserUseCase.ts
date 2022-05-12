import { inject, injectable } from "tsyringe";
import { UserRepository } from "../../repositories/implementations/UsersRepository";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from "../../../../errors/appError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject('UserRepository')
        private userRepository: UserRepository
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = compare(user.password, password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "a2b655df9a424a124b62bfbdab67284d", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenResponse: IResponse = {
            token,
            user:{
                name: user.name,
                email
            }
        }

        return tokenResponse;
    }
}

export { AuthenticateUserUseCase };