# ![Cover](.github/assets/cover-nodejs.png)

## Sobre o projeto

O Gym Ares API é uma plataforma robusta que oferece funcionalidades essenciais para gestão de academias. Permite cadastro, autenticação e acesso ao perfil do usuário, além de facilitar a busca por academias, histórico de check-ins e validação eficiente. Simplificamos a experiência fitness!

Design Patterns utilizados

- Repository Design Pattern (facilitar a implementação de testes)
- Factory design pattern

RBAC (Role-Based Access Control) é um modelo de controle de acesso baseado em funções, onde as permissões são atribuídas com base no papel ou função que um usuário possui dentro de uma organização.

CI = Continuous Integration
CD = Continuous Deployment/Delivery

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [Vitest](https://vitest.dev/)

Opções de ORM

- [Prisma](https://www.prisma.io/)
- [Typeorm](https://typeorm.io/)
- [Sequelize](https://sequelize.org/)

Opções de ferramentas de observabilidade

- [Sequelize](https://www.datadoghq.com/)
- [Newrelic](https://newrelic.com/)
- [Sentry](https://sentry.io/welcome/)

## Instalação

```sh

# Instalação das dependências
npm install

# Setup do banco de dados
npm run setup:database
```

## Comandos

```bash
# Configuração do typescript
$ npx tsc --init
# O npx é um shorthand(atalho) para executar scripts do node_modules / bin
$ npx
# Iniciar o prisma
$ npx prisma init
# Criar a tipagem do schema
$ npx prisma generate
# Criar migrations
$ npx prisma migrate dev
# Acessa o prisma studio
$ npx prisma studio
# Iniciar o docker
$ docker-compose up -d
# Reiniciar o docker recuperando os dados
$ docker-compose start
# Parar os serviços
$ docker-compose stop
# Remover os serviços
$ docker-compose down

```

## Requisitos


<details>
<summary>Clique aqui para visualizar</summary>


## RFs (Requisitos funcionais)

> **RFs**
> As funcionalidades da aplicação, o que o usuário vai poder fazer na aplicação.

- [X]  Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [X] Deve ser possível obter  o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de checks-ins;
- [X] Deve ser possível o usuário buscar academia próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar o check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

> **RNs**
> Que condições são aplicadas para cada funcionalidade, quais as limitações e permissões um requisito funcional tem.

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer o check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

> **RNFs**
> Requisitos técnicos que os usuários não tem tanta influencia, o usuário não vai ter controle sobre esses requisitos.

- [X] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

</details>

## Contribuição

Contribuições são bem-vindas!

Para contribuir, basta abrir uma issue ou pull request neste repositório.

## Autor
|  [<img loading="lazy" src="https://github.com/MauricioAires.png" width=115><br><sub>Mauricio Aires 👋🏽</sub>](https://github.com/MauricioAires) |
|  :---: |
