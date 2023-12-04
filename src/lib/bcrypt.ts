import { env } from '@/env'
import { compare, hash } from 'bcryptjs'

export async function hashPassword(password: string) {
  return await hash(password, env.BCRYPT_SALT)
}

export async function comparePassword(password: string, password_hash: string) {
  return await compare(password, password_hash)
}
