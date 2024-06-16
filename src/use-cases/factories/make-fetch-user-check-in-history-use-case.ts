import { PrismaCheckInsRepository } from '@/repositories/prisma-repo/prisma-check-ins-repository'
import { FetchMemberCheckInHistoryUseCase } from '../fetch-users-check-in-history'

export function makeFetchUsersCheckInHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const checkInHistoryUseCase = new FetchMemberCheckInHistoryUseCase(
    prismaCheckInsRepository,
  )

  return checkInHistoryUseCase
}
