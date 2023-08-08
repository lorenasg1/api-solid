export interface CheckIn {
  id: string
  user_id: string
  gym_id: string
  created_at: Date
  validated_at?: Date | null
}

export interface CreateCheckInDto {
  user_id: string
  gym_id: string
  validated_at?: Date | null
}

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>
  create(data: CreateCheckInDto): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  save(checkIn: CheckIn): Promise<CheckIn>
}
