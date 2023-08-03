import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';

let checkInsRepository: CheckInsRepository
let gymsRepository: GymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gym-01',
      name: 'gym-01',
      description: 'gym description',
      phone: 'gym phone',
      latitude: new Decimal(-7.2417644),
      longitude: new Decimal(-35.8744963),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({ 
      userId: 'user-01', 
      gymId: 'gym-01', 
      userLatitude: -7.2417644,
      userLongitude: -35.8744963
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.2417644,
      userLongitude: -35.8744963
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -7.2417644,
        userLongitude: -35.8744963
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 7, 1, 9, 0, 0))

    await sut.execute({ 
      userId: 'user-01', 
      gymId: 'gym-01', 
      userLatitude: -7.2417644,
      userLongitude: -35.8744963
    })

    vi.setSystemTime(new Date(2023, 7, 2, 9, 0, 0))

    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -7.2417644,
      userLongitude: -35.8744963
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to remote check in', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      name: 'gym-02',
      description: 'gym description',
      phone: 'gym phone',
      latitude: new Decimal(-7.2419178),
      longitude: new Decimal(-35.8825136),
    })

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -7.2417644,
      userLongitude: -35.8744963
    })).rejects.toBeInstanceOf(Error)
  })

})
