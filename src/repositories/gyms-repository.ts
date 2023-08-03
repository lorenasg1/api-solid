import { Decimal } from "@prisma/client/runtime/library"
import { CheckIn } from "./check-ins-repository"

export interface Gym {
  id: string
  name: string
  description: string
  phone: string
  latitude: Decimal
  longitude: Decimal
  checkIns: CheckIn[]
}

export interface CreateGymDto {
  name: string
  description: string
  phone: string
  latitude: Decimal
  longitude: Decimal
  checkIns: CheckIn[]
}

export interface GymsRepository {
  create(data: CreateGymDto): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
}