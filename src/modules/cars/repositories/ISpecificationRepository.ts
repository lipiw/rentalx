import { Specification } from "../entities/Specification"

interface ISpecificationDTO{
    name: string,
    description: string
}

interface ISpecificationRepository{
    create({name, description}: ISpecificationDTO): Promise<void>,
    list(): Promise<Specification[]>,
    findByName(name: string): Promise<Specification>
}

export {ISpecificationDTO, ISpecificationRepository};