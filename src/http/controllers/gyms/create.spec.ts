import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { cerateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await cerateAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(636) 504-4112',
        latitude: -6.0511966,
        longitude: -38.4534359,
      })

    expect(response.statusCode).toBe(201)
  })
})
