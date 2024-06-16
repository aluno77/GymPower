import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'

import { search } from './search-gym-controllers'
import { nearby } from './nearby-gym-controllers'
import { create } from './create-gym-controllers'

import { veryUserRoleJwt } from '@/http/middlewares/very-user-role-jwt'

export async function gymsRouter(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [veryUserRoleJwt('ADMIN')] }, create)
}
