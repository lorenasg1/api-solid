import { CheckIn } from './check-ins-repository'

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
  checkIns?: CheckIn[]
}

export interface CreateUserDto {
  name: string
  email: string
  password_hash: string
}

export interface UsersRepository {
  create(data: CreateUserDto): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
