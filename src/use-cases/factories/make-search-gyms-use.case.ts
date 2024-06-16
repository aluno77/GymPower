import { PrismaGymsRepository } from '@/repositories/prisma-repo/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gym-use-case'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository)

  return searchGymsUseCase
}
