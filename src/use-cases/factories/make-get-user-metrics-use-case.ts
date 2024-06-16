import { PrismaCheckInsRepository } from '@/repositories/prisma-repo/prisma-check-ins-repository'
import { GetUsersMetricUseCase } from '../get-users-metric-use-case'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUsersMetricUseCase = new GetUsersMetricUseCase(
    prismaCheckInsRepository,
  )

  return getUsersMetricUseCase
}
