import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Wayne Garner',
      email: 'ticew@gisuwic.to',
      password: '123457',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'ticew@gisuwic.to',
      password: '123457',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

/**
 *  NOTA
 * Não criamos teste e2e para cada regra de negócio, criamos
 * testes mais globais testa as rotas de sucesso
 */
