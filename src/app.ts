import { checkInsRoutes } from './http/controllers/checkin/routes'
import { userRoutes } from './http/controllers/users/routes'
import { gymsRouter } from './http/controllers/gyms/routes'

import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { ZodError } from 'zod'
import fastify from 'fastify'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // TODO: ASSINATURA DO COOKIE X POR QUE NÃO TEM ASSINATURA E FALSE
  },
  sign: {
    expiresIn: '30m', // TODO: REFRESH TOKEN EXPIRATION
  },
})

app.register(fastifyCookie) // TODO: Cookie Parser

// --> Rotas
app.register(userRoutes)
app.register(gymsRouter)
app.register(checkInsRoutes)

// --> Error Handler
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validations error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should to an external tool like Sentry/DataDog
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
