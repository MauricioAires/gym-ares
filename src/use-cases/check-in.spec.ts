import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      title: 'Ignite Academy',
      description: '',
      latitude: -5.9777311,
      longitude: -38.3492147,
      phone: '129389',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    /**
     * Uma  boa pratica quando utiliza um mock e sempre re-setar apos o test para
     * não afetar outros
     */
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.9777311,
      userLongitude: -38.3492147,
    })

    expect(checkIn).toMatchObject({
      created_at: expect.any(Date),
      gym_id: 'gym-01',
      id: expect.any(String),
      user_id: 'user-01',
      validated_at: null,
    })
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.9777311,
      userLongitude: -38.3492147,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -5.9777311,
        userLongitude: -38.3492147,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.9777311,
      userLongitude: -38.3492147,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -5.9777311,
      userLongitude: -38.3492147,
    })

    expect(checkIn).toMatchObject({
      created_at: expect.any(Date),
      gym_id: 'gym-01',
      id: expect.any(String),
      user_id: 'user-01',
      validated_at: null,
    })
  })

  it('should not be able to check in on distant gym', async () => {
    await gymRepository.create({
      id: 'gym-02',
      title: 'Ignite Academy 02',
      description: '',
      latitude: -5.9777311,
      longitude: -38.3492147,
      phone: '8898127372',
      created_at: new Date(),
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -6.0511966,
        userLongitude: -38.4534359,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
