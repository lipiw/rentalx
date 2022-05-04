import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationController";

const specificationRoutes = Router();

const createSpecificaitonController = new CreateSpecificationController();
const listSpecificaitonController = new ListSpecificationsController();

specificationRoutes.post("/", createSpecificaitonController.handle);

specificationRoutes.get("/", listSpecificaitonController.handle);

export { specificationRoutes };