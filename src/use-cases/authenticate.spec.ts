import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hashPassword } from '@/lib/bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    // register
    await userRepository.create({
      email: 'dicpenwim@kecmap.hu',
      password_hash: await hashPassword('123456'),
      name: 'Peter Garcia',
    })

    const { user } = await sut.execute({
      email: 'dicpenwim@kecmap.hu',
      password: '123456',
    })

    expect(user).toMatchObject({
      email: 'dicpenwim@kecmap.hu',
      name: 'Peter Garcia',
      id: expect.any(String),
      created_at: expect.any(Date),
      password_hash: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    // register
    await userRepository.create({
      email: 'dicpenwim@kecmap.hu',
      password_hash: await hashPassword('123456'),
      name: 'Peter Garcia',
    })

    await expect(() =>
      sut.execute({
        email: 'dicpenwim@kecmap.hu',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'dicpenwim@kecmap.hu',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
