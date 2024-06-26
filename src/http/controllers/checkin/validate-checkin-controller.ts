import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkinValidateParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = checkinValidateParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
