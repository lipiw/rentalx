import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoryRepository = CategoriesRepository.getInstance();
const importCatgoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(importCatgoryUseCase);

export { importCategoryController };