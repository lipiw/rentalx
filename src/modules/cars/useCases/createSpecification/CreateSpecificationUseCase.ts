import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest{
    name: string,
    description: string
}

class CreateSpecificationUseCase{
    constructor(private specificationsRepositry: SpecificationRepository){}

    execute({name, description}: IRequest):void{
        const specificationAlreadyExists = this.specificationsRepositry.findByName(name);

        if(specificationAlreadyExists){
            throw new Error("Specification already exists");
        }

        this.specificationsRepositry.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };