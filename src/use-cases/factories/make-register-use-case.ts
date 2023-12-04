import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}

/**
 * NOTE
 *
 * Factories => Server para automatizar o trabalho da criação
 * do caso de uso.
 *
 * Tendo em vista que o caso de uso pode conter múltiplas dependências.
 *
 * Dessa forma sempre que for utilizar o caso de uso exite uma função que
 * já entrega o caso de uso pronto com todas as dependências.
 */
