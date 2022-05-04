import { parse } from "csv-parse";
import fs from "fs";
import { injectable, inject } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
        ){}

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) =>{
            // Criando o STREAM para facilitar a leitura dos DADOS do arquivo
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            // interpretador de 
            const parseFile = parse();

            //pipe pega as informações que são lidas dentro do steamer (pro padrão ja separa por virgula)
            stream.pipe(parseFile);

            // O que iremos fazer com cada informação lidas
            parseFile.on("data", async (line) =>{
                const [name, description] = line;

                categories.push({
                    name,
                    description
                });
            }).on("end", () =>{
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) =>{
                reject(err);
            })
        });

    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategory(file);
        
        categories.map(async category =>{
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if(!existCategory){
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        })
    }
}

export { ImportCategoryUseCase };