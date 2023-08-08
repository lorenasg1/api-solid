import { ExpiredCheckInValidationError } from '@/errors/expired-check-in-validation-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import {
  CheckIn,
  CheckInsRepository,
} from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const minutesPassedAfterCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (minutesPassedAfterCheckInCreation > 20)
      throw new ExpiredCheckInValidationError()

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
