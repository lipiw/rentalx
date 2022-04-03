import { Specification } from "../../model/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

class ListSpecificationsUseCase{

    constructor(private specificationRepository: SpecificationRepository){}

    execute(): Specification[]{
        const all = this.specificationRepository.list();

        return all;
    }
}

export { ListSpecificationsUseCase };