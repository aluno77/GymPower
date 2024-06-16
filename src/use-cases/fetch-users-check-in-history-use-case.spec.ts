import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FetchMemberCheckInHistoryUseCase } from './fetch-users-check-in-history'
import { beforeEach, describe, expect, it } from 'vitest'

let checkinsRepository: InMemoryCheckInRepository
let sut: FetchMemberCheckInHistoryUseCase
// fetch check in history Use Case
describe('Listar historico de check in dos usuários Caso de Uso', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInRepository()
    sut = new FetchMemberCheckInHistoryUseCase(checkinsRepository)
  })

  // should be able to fetch check in history
  it('deve ser possível fazer check in', async () => {
    await checkinsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    await checkinsRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-01', user_Id: 'user-01' }),
      expect.objectContaining({ gym_Id: 'gym-02', user_Id: 'user-01' }),
    ])
  })
  // should be able to fetch paginated user check in history
  it('deve ser capaz de buscar o histórico de verificação do usuário paginados', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gym_Id: `gym-${i}`,
        user_Id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ])
  })
})
