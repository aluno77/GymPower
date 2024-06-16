import { PrismaGymsRepository } from '@/repositories/prisma-repo/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym-use-case'

export function makeCreateGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)

  return createGymUseCase
}
