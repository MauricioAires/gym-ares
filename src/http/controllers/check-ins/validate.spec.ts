import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { cerateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check In (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await cerateAndAuthenticateUser(app, true)

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

    const user = await prisma.user.findFirstOrThrow()

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
