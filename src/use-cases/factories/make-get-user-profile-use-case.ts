import { PrismaUserRepository } from '@/repositories/prisma-repo/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)

  return getUserProfileUseCase
}
