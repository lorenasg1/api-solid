import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { CreateGymDto, Gym, GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create(data: CreateGymDto): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date()
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
