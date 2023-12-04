import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

/**
 * NOTE:
 *
 * Padrão de nomenclatura de arquivos, quando é caso de uso que
 * vai retornar apenas uma 1 item eu coloco o nome com o prefixo Get
 * quando é um caso de uso que vai retornar mais de um registro e coloco o prefixo fetch
 *
 */

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page?: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
