import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let checkinsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase
// Fetch gyms nearby Use Case
describe('Listar academias próximas Caso de Uso', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(checkinsRepository)
  })

  // should be able to fetch gyms nearby
  it('Deve ser possível listar as academias próximas', async () => {
    await checkinsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: 'null',
      latitude: -2.6944395,
      longitude: -59.7063928,
    })

    await checkinsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: 'null',
      latitude: -2.9486504,
      longitude: -60.0422811,
    })

    const { gyms } = await sut.execute({
      userLatitude: -2.6944395,
      userLongitude: -59.7063928,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
