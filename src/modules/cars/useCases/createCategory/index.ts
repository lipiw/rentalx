import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"

const createCategoryRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export {createCategoryController, createCategoryUseCase};