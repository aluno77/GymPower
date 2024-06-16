import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'

interface FetchMemberCheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchMemberCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({
    userId,
    page,
  }: FetchMemberCheckInHistoryUseCaseRequest): Promise<FetchMemberCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
