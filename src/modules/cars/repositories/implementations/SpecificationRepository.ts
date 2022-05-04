import { Repository, getRepository } from 'typeorm';
import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { Specification } from "../../entities/Specification";

class SpecificationRepository implements ISpecificationRepository{
    
    private specifications: Repository<Specification>;

    constructor(){
        this.specifications = getRepository(Specification);
    }

    async create({name, description}: ISpecificationDTO): Promise<void>{
        const specification = this.specifications.create({
            name,
            description
        });

        await this.specifications.save(specification);
    }

    async list(): Promise<Specification[]>{
        const specifications = await this.specifications.find();
        return  specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({name})
        return specification;
    }
}

export { SpecificationRepository };