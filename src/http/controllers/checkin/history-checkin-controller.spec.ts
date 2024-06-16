import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { app } from '@/app'

describe('History Check in Controller e2e ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '123456789',
        latitude: -2.6944395,
        longitude: -59.7063928,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
        {
          gym_Id: gym.id,
          user_Id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
      expect.objectContaining({
        gym_Id: gym.id,
        user_Id: user.id,
      }),
    ])
  })
})
