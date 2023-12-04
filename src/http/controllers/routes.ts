import { FastifyInstance } from 'fastify'

import { usersRoutes } from './users/routes'
import { gymsRoutes } from './gyms/routes'
import { checkInsRoutes } from './check-ins/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}
