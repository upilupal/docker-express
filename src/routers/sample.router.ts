import { Router } from "express";
import { SampleController } from "../controllers/sample.controller";

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.sampleController.getSampleData);
    this.router.post("/", this.sampleController.createSampleData);
  }

  getRouter() {
    return this.router;
  }
}
