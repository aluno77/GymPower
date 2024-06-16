import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUsersMetricUseCase } from './get-users-metric-use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let checkinsRepository: InMemoryCheckInRepository
let sut: GetUsersMetricUseCase
// Get Users Metric Use Case
describe('Buscar metricas de acesso dos usuários Caso de Uso', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInRepository()
    sut = new GetUsersMetricUseCase(checkinsRepository)
  })

  // should be able to get check in count from metric
  it('deve ser possível listar metricas de check ins realizados', async () => {
    await checkinsRepository.create({
      gym_Id: 'gym-01',
      user_Id: 'user-01',
    })

    await checkinsRepository.create({
      gym_Id: 'gym-02',
      user_Id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
