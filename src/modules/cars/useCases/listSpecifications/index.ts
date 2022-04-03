import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { ListSpecificationsController } from "./ListSpecificationController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const specificationRepository = SpecificationRepository.getInstance();
const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase);

export { listSpecificationsController };