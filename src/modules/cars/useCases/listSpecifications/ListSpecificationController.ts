import { Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController{

    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase){}

    handle(response: Response): Response{
        const all = this.listSpecificationsUseCase.execute();

        return response.json(all);
    }
}

export { ListSpecificationsController };