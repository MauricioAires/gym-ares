import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { cerateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check In (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await cerateAndAuthenticateUser(app)

    /**
     * Não é uma boa pratica criar a academia direto
     * pelo prisma
     */
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -6.0511966,
        longitude: -38.4534359,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -6.0511966,
        longitude: -38.4534359,
      })

    expect(response.statusCode).toBe(201)
  })
})
