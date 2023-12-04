import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}

/**
 * NOTE:
 *
 * Padrão de nomenclatura de métodos
 *
 * quando eu coloco findBy .... vai retornar apenas um registro
 * quando eu coloco findMany ... vai retornar uma lista
 */
