import { Decimal } from "@prisma/client/runtime/library"
import { CheckIn } from "./check-ins-repository"

export interface Gym {
  id: string
  name: string
  description: string | null
  phone: string | null
  latitude: Decimal
  longitude: Decimal
  checkIns?: CheckIn[]
  created_at: Date
}

export interface CreateGymDto {
  id?: string
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: CreateGymDto): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findMany(query: string, page: number): Promise<Gym[]>;
}