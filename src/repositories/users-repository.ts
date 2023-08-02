interface CheckIn {
  id: string
  created_at: Date
  user_id: string
  gym_id: string
}

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export interface CreateUserDto {
  name: string
  email: string
  password_hash: string
}

export interface UsersRepository {
  create(data: CreateUserDto): Promise<User>
  findByEmail(email: string): Promise<User | null>
}