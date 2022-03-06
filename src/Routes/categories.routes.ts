import { Category } from './../model/Category';
import { Router } from "express";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const category = new Category();

    Object.assign(category, {
        name,
        description,
        created_at: new Date(),
    })

    categories.push(category);

    return response.status(201).json(category);
});

categoriesRoutes.get("/", (request, response) => {
    return response.json({categories});
});

export { categoriesRoutes };
