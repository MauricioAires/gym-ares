import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { hashPassword } from '@/lib/bcrypt'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able get user profile', async () => {
    // register
    const createdUser = await userRepository.create({
      email: 'dicpenwim@kecmap.hu',
      password_hash: await hashPassword('123456'),
      name: 'Peter Garcia',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toMatchObject({
      email: 'dicpenwim@kecmap.hu',
      name: 'Peter Garcia',
      id: expect.any(String),
      created_at: expect.any(Date),
      password_hash: expect.any(String),
    })
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
