import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { cerateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able search gyms by title', async () => {
    const { token } = await cerateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '(636) 504-4112',
        latitude: -6.0511966,
        longitude: -38.4534359,
      })

    await request(app.server)
      .post('/gyms/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'Some description',
        phone: '(636) 504-4112',
        latitude: -6.0511966,
        longitude: -38.4534359,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'TypeScript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})
