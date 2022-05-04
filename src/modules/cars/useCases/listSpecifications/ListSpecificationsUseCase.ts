import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

@injectable()
class ListSpecificationsUseCase{

    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: SpecificationRepository){}

    async execute(): Promise<Specification[]>{
        const all = await this.specificationRepository.list();

        return all;
    }
}

export { ListSpecificationsUseCase };