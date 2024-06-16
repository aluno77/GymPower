import { PrismaCheckInsRepository } from '@/repositories/prisma-repo/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in-use-case'

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    prismaCheckInsRepository,
  )

  return validateCheckInUseCase
}
