import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym-use-case'

let createGymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase
// Create a gym Use Case
describe('Criação de uma Academia Caso de Uso', () => {
  beforeEach(() => {
    createGymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(createGymRepository)
  })
  // should be able to create a gym
  it('Deve ser possível cadastrar uma Academia', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Teste',
      description: null,
      phone: 'null',
      latitude: -2.6944395,
      longitude: -59.7063928,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
