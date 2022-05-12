import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {name, email, driver_license, password} = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            driver_license,
            password
        });

        return response.send(201).send();
    }
}

export { CreateUserController };