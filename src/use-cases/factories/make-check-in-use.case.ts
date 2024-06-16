import { PrismaCheckInsRepository } from '@/repositories/prisma-repo/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma-repo/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in-use-case'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return checkInUseCase
}
