import { makeFetchUsersCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInHistoryUseCase = makeFetchUsersCheckInHistoryUseCase()

  const { checkIns } = await fetchCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.send({
    checkIns,
  })
}
