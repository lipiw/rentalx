import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController{
    handle(request: Request, response: Response): Response{
        const { file } = request;
        
        const importCategoryUseCasa = container.resolve(ImportCategoryUseCase); 

        importCategoryUseCasa.execute(file);

        return response.send();
    }
}

export { ImportCategoryController };