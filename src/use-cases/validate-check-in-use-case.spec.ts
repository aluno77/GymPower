import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from './validate-check-in-use-case'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase
// Validate check in Use Case
describe('Validação de check in de Caso de Uso', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  // should be able to validate a check in
  it('Deve ser possível validar check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_Id: 'gym-01',
      gym_Id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.created_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  // should not be able to validate an inexistent check in
  it('Não deve ser capaz de validar um check-in inexistente ', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  // 'should not be able to validate the check in after 20 minutes of its creation'
  it('Não deve ser capaz de validar o check-in após 20 minutos de sua criação', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 14, 40))

    const createdCheckIn = await checkInsRepository.create({
      user_Id: 'gym-01',
      gym_Id: 'user-01',
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
