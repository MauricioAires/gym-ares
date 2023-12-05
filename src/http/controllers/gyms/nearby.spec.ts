import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { cerateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby a gym', async () => {
    const { token } = await cerateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        description: '',
        phone: '',
        latitude: -6.0511966,
        longitude: -38.4534359,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: '',
        phone: '',
        latitude: -6.13,
        longitude: -38.5,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -6.0511966,
        longitude: -38.4534359,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
