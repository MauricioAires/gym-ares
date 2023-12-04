import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -6.0511966,
      longitude: -38.4534359,
    })

    expect(gym).toMatchObject({
      created_at: expect.any(Date),
      description: '',
      id: expect.any(String),
      phone: '',
      title: 'Javascript Gym',
    })
  })
})
