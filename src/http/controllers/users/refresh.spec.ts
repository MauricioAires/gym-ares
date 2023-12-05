import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Wayne Garner',
      email: 'ticew@gisuwic.to',
      password: '123457',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'ticew@gisuwic.to',
      password: '123457',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken'),
    ])
  })
})

/**
 *  NOTA
 * Não criamos teste e2e para cada regra de negócio, criamos
 * testes mais globais testa as rotas de sucesso
 */
