import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepository } from "../../repositories/implementations/UsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/appError";

@injectable()
class CreateUserUseCase{

    
    constructor(
        @inject("UserRepository")
        private userRepository: UserRepository
    ){}

    async execute({name, email, driver_license, password}:ICreateUserDTO): Promise<void>{
        const emailAlreadyExists = this.userRepository.findByEmail(email);

        if(emailAlreadyExists){
            throw new AppError("Email already exists");
        }

        const passwordHash = await hash(password,8);

        await this.userRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        });

    }
}

export { CreateUserUseCase };