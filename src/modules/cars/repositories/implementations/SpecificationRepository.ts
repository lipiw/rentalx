import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { Specification } from "../../model/Specification";

class SpecificationRepository implements ISpecificationRepository{
    
    private specifications: Specification[];

    public static INSTANCE: SpecificationRepository;

    private constructor(){
        this.specifications = [];
    }

    public static getInstance(){
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        
        return SpecificationRepository.INSTANCE;
    }

    create({name, description}: ISpecificationDTO){
        const specification = new Specification();
        
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    list():Specification[]{
        return this.specifications;
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(specification => specification.name === name)
        return specification;
    }
}

export { SpecificationRepository };