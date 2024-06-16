import { PrismaGymsRepository } from '@/repositories/prisma-repo/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
    prismaGymsRepository,
  )

  return fetchNearbyGymsUseCase
}
