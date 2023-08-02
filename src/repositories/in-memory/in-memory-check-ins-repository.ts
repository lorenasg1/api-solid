import { randomUUID } from "crypto";
import { CheckIn, CheckInsRepository, CreateCheckInDto } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: CreateCheckInDto): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
