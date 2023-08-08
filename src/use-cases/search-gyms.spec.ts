import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: GymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'gym-01',
      description: 'gym description',
      phone: 'gym phone',
      latitude: -7.2417644,
      longitude: -35.8744963,
    })

    await gymsRepository.create({
      name: 'gym-02',
      description: 'gym description',
      phone: 'gym phone',
      latitude: -7.2417644,
      longitude: -35.8774963,
    })

    const { gyms } = await sut.execute({
      query: 'gym-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'gym-01' })])
  })

  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `gym-${i}`,
        description: 'gym description',
        phone: 'gym phone',
        latitude: -7.2417644,
        longitude: -35.8744963,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'gym-21' }),
      expect.objectContaining({ name: 'gym-22' }),
    ])
  })
})
