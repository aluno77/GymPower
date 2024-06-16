import { veryUserRoleJwt } from '@/http/middlewares/very-user-role-jwt'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'

import type { FastifyInstance } from 'fastify'

import { validate } from './validate-checkin-controller'
import { history } from './history-checkin-controller'
import { metrics } from './metrics-checkin-controller'
import { create } from './create-checkin-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [veryUserRoleJwt('ADMIN')] },
    validate,
  )
}
