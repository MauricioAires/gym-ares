import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  BCRYPT_SALT: z.coerce.number(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(`❌ Invalid environment variables: ${_env.error.format()}`)

  // Error top level (quando não é dentro de uma função, dessa forma ele vai derrubar a aplicação)
  throw new Error(`Invalid environment variables`)
}

export const env = _env.data
