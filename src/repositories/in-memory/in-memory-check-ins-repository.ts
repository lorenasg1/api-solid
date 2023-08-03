import { randomUUID } from "crypto";
import dayjs from "dayjs";
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

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const checkInIsSameDate = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)


      return checkIn.user_id === userId && checkInIsSameDate
    })    
    
    if(!checkInSameDate) return null

    return checkInSameDate
  }
}
