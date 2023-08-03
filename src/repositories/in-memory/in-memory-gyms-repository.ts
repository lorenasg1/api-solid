import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { CreateGymDto, Gym, GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create(data: CreateGymDto): Promise<Gym> {
    const gym = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      phone: data.phone,
      latitude: new Decimal(data.latitude),
      longitude: new Decimal(data.longitude),
      checkIns: data.checkIns,
    }

    this.gyms.push(gym)

    return gym
  }
  
  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find(gym => gym.id === id);

    if(!gym) return null;

    return gym
  }
}
