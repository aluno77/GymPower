import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-in-error'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxDistanceError } from './errors/max-distance-error'
import { CheckInUseCase } from './check-in-use-case'
import { Decimal } from '@prisma/client/runtime/library'

let checkinsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check in de um Caso de Uso', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkinsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia Teste',
      description: 'Academia de teste',
      phone: '9299999344',
      latitude: -2.6944395,
      longitude: -59.7063928,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // should be able to check in
  it('deve ser possível fazer check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.6944395,
      userLongitude: -59.7063928,
    })
    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })
  // todo: red, green, refactor
  // should not be able to check in twice on the same day
  it('Não deveria fazer check in no mesmo dia', async () => {
    vi.setSystemTime(new Date('2024-01-01T10:00:00'))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.6944395,
      userLongitude: -59.7063928,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -2.6944395,
        userLongitude: -59.7063928,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })
  // should be able to check in twice but in different day
  it('deve poder fazer o check-in duas vezes, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date('2024-01-01T10:00:00'))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.6944395,
      userLongitude: -59.7063928,
    })

    vi.setSystemTime(new Date('2024-02-01T10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -2.6944395,
      userLongitude: -59.7063928,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // should not be able to check in on distance Gym
  it('Não pode ser possível fazer check in a uma distancia do Gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia Teste',
      description: 'Academia de teste',
      phone: '92999999999',
      latitude: new Decimal('-3.0229446'),
      longitude: new Decimal('-60.094046'),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -2.6944395,
        userLongitude: -59.7063928,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
