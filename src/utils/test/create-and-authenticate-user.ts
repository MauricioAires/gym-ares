import { hashPassword } from '@/lib/bcrypt'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function cerateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      email: 'ticew@gisuwic.to',
      name: 'Mabel Palmer',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      password_hash: await hashPassword('123457'),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'ticew@gisuwic.to',
    password: '123457',
  })

  const { token } = authResponse.body

  return { token }
}
