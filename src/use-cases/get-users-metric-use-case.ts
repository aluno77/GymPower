import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUsersMetricUseCaseRequest {
  userId: string
}

interface GetUsersMetricUseCaseResponse {
  checkInsCount: number
}

export class GetUsersMetricUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({
    userId,
  }: GetUsersMetricUseCaseRequest): Promise<GetUsersMetricUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
