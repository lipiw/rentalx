import { container } from 'tsyringe';
import { Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController{

    async handle(response: Response): Promise<Response>{
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

        const all = await listSpecificationsUseCase.execute();

        return response.json(all);
    }
}

export { ListSpecificationsController };