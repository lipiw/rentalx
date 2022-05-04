import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository{

    private categories: Repository<Category>;

    constructor(){
        this.categories = getRepository(Category);
    }

    async create({name, description}:ICreateCategoryDTO): Promise<void>{
        const category = this.categories.create({
            name,
            description
        });

        await this.categories.save(category);
    }

    async list():Promise<Category[]>{
        const categories = await this.categories.find();
        return categories;
    }

    async findByName(name: string):Promise<Category>{
        const category = await this.categories.findOne({name});

        return category;   
    }
}

export { CategoriesRepository };