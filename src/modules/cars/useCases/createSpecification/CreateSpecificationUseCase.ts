import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: SpecificationRepository
        ){}

    async execute({name, description}: IRequest):Promise<void>{
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification already exists");
        }

        this.specificationRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };