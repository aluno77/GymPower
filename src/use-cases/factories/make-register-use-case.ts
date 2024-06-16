import { PrismaUserRepository } from '@/repositories/prisma-repo/prisma-user-repository'
import { RegisterUseCase } from '../register-use-case'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(prismaUserRepository)

  return registerUseCase
}
