import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gym-use-case'

let checkinsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
// should be able to gyms Use Case
describe('Deve ser possível listar academias Caso de Uso', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(checkinsRepository)
  })

  // should be able to fetch check in history
  it('deve ser possível fazer check in', async () => {
    await checkinsRepository.create({
      title: 'Academia Power',
      description: null,
      phone: 'null',
      latitude: -2.6944395,
      longitude: -59.7063928,
    })

    await checkinsRepository.create({
      title: 'Academia Speed',
      description: null,
      phone: 'null',
      latitude: -2.6944395,
      longitude: -59.7063928,
    })

    const { gyms } = await sut.execute({
      query: 'Academia Power',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia Power' })])
  })
  // should be able to fetch paginated gyms search
  it('Deve ser possível listar as academias paginadas', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        title: `Academia Power ${i}`,
        description: null,
        phone: 'null',
        latitude: -2.6944395,
        longitude: -59.7063928,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia Power',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Power 21' }),
      expect.objectContaining({ title: 'Academia Power 22' }),
    ])
  })
})
