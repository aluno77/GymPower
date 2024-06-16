import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate-controller'
import { refreshToken } from './refresh-controller'
import { register } from './register-controller'
import { profile } from './profile-controller'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)

  /** Authenticate */
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
