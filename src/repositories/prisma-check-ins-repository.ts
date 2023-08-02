import { prisma } from "@/lib/prisma";
import { CheckIn, CheckInsRepository, CreateCheckInDto } from "./check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  create(data: CreateCheckInDto): Promise<CheckIn> {
    return prisma.checkIn.create({
      data
    })
  }

}