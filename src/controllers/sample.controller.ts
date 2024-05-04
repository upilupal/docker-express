import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { redisClient } from "../lib/redis";

const prisma = new PrismaClient();

export class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const cachedSampleData = await redisClient.get("sampleData");

      if (cachedSampleData) {
        console.log("INI SAMPLE DATA DARI REDIS");

        return res.status(200).send(cachedSampleData);
      }

      const sampleData = await prisma.sample.findMany();

      console.log("INI SAMPLE DATA DARI DATABASE");

      return res.status(200).send(sampleData);
    } catch (error) {
      next(error);
    }
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const newSampleData = await prisma.sample.create({
        data: { name },
      });

      const sampleData = await prisma.sample.findMany();

      await redisClient.setEx("sampleData", 3600, JSON.stringify(sampleData));

      return res.status(200).send(newSampleData);
    } catch (error) {
      next(error);
    }
  }
}
