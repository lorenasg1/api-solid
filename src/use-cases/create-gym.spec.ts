import { GymsRepository } from '@/repositories/gyms-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register an user', async () => {
    const { gym } = await sut.execute({ 
      name: 'gym-01',
      description: 'gym description',
      phone: 'gym phone',
      latitude: -7.2417644,
      longitude: -35.8744963,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
