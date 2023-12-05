import { FastifyReply, FastifyRequest } from 'fastify'

/**
 *  Hoje essa rota não está batendo no banco de dados mas se quisesse criar uma estratégia
 * de invalidação de login o refresh token seria armazenado no bando de dados
 * e seria verificado se ele existe no banco de não o usuário está não autenticado
 */

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  /**
   * Essa função faz a validação do jwt refresh token que esta nos cookies
   * que foi configurado no app
   *
   *  cookie: {
   *    cookieName: 'refreshToken',
   *    signed: false,
   * }
   *
   * faz todo o processo de validar se o token foi modificado é etc
   *
   */
  await request.jwtVerify({
    onlyCookie: true,
  })

  const { role } = request.user

  /**
   * Se o código passar dessa função significa que o jwt refresh token ainda está valido
   * e o usuário pode gerar um novo token e refresh token
   */
  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // qualquer requisição do backend vai ter acesso
      secure: true, // O cookie será criptografado em HTTPs não permitindo o Frontend ter acesso
      sameSite: true, // O cookie será acessível apenas dentro do próprio domínio
      httpOnly: true, // O cookie será acessado apenas pelo backend
    })
    .status(200)
    .send({
      token,
    })
}
