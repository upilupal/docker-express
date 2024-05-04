import express, { Express, NextFunction, Request, Response, json } from "express";
import { SampleRouter } from "./routers/sample.router";
import { redisClient } from "./lib/redis";

const PORT = 8000;
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure() {
    this.app.use(json());
  }

  private routes() {
    const sampleRouter = new SampleRouter();

    this.app.use("/samples", sampleRouter.getRouter());
  }

  private handleError() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(400).send(err.message);
    });
  }

  public async start() {
    await redisClient.connect();
    this.app.listen(PORT, () => {
      console.log(`Server running on PORT : ${PORT}`);
    });
  }
}
