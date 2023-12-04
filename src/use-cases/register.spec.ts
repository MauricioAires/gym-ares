import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { comparePassword } from '@/lib/bcrypt'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'dicpenwim@kecmap.hu',
      name: 'Dominic May',
      password: '123456',
    })

    expect(user).toMatchObject({
      email: 'dicpenwim@kecmap.hu',
      name: 'Dominic May',
      id: expect.any(String),
      created_at: expect.any(Date),
      password_hash: expect.any(String),
    })
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'dicpenwim@kecmap.hu',
      name: 'Dominic May',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await comparePassword(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'vod@zehwi.bt'

    await sut.execute({
      email,
      name: 'Dominic May',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Dominic May',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

/// TDD -> Test Drive development (Desenvolvimento dirigido a test)
