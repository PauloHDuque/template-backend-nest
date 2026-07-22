# Estrutura de Pastas

## Visão Geral

```text
template-back-nest/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── common/
│   │   └── filters/
│   │       └── global-exception.filter.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   └── strategies/
│   │   ├── health/
│   │   └── prisma/
│   ├── generated/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── docker-compose.yml
├── nest-cli.json
└── package.json
```

## Arquitetura Modular do NestJS

### `src/`

Contém o código-fonte da aplicação. O arquivo `main.ts` cria a aplicação NestJS, configura o `ValidationPipe` global, registra o Swagger e inicia o servidor. O arquivo `app.module.ts` é o módulo raiz e reúne os módulos funcionais.

### Módulos (em `src/modules/`)

Cada domínio fica isolado em uma pasta dentro de `src/modules/` e possui um arquivo `*.module.ts`. O módulo declara os controllers, providers e dependências daquele domínio. Neste projeto, `auth/`, `health/` e `prisma/` são módulos separados.

### Comum (em `src/common/`)

Contém recursos compartilhados globalmente por toda a aplicação. No momento abriga os **Filters**, como o `global-exception.filter.ts` que centraliza e padroniza o retorno de todos os erros (inclusive erros não tratados) da aplicação.

### Controllers

Arquivos `*.controller.ts` recebem requisições HTTP, extraem os dados de entrada, chamam os serviços e retornam as respostas. Controllers devem permanecer pequenos e não concentrar regras de negócio.

### Services

Arquivos `*.service.ts` implementam regras de negócio e integrações. O `AuthService`, por exemplo, consulta o usuário, compara a senha com bcrypt e gera o token JWT.

### DTOs

A pasta `dto/` contém objetos de transferência de dados. Eles descrevem e validam a entrada das rotas com `class-validator`, além de fornecer metadados para o Swagger.

### Strategies

A pasta `strategies/` contém estratégias do Passport. A estratégia JWT extrai o token Bearer, valida sua assinatura e disponibiliza o payload autenticado.

### `src/modules/prisma/`

Contém o módulo e o serviço que encapsulam o Prisma Client. O `PrismaService` configura o adaptador do MySQL e disponibiliza o acesso ao banco para os demais módulos.

### `src/generated/`

Recebe o Prisma Client gerado. O conteúdo dessa pasta não deve ser alterado manualmente nem versionado.

### `prisma/`

Contém o schema do banco de dados, o seed e, futuramente, as migrações. O seed cria ou atualiza o usuário administrativo com uma senha protegida por bcrypt.

### `test/`

Armazena os testes E2E e sua configuração do Jest. Os testes unitários permanecem próximos aos arquivos testados em `src/` com o sufixo `.spec.ts`.

## Fluxo da Aplicação

1. `main.ts` inicializa a aplicação e carrega o `AppModule`.
2. O NestJS resolve os módulos, controllers e providers por injeção de dependência.
3. Uma requisição chega ao controller correspondente.
4. O `ValidationPipe` transforma e valida o DTO antes da execução do método.
5. O controller chama um service para executar a regra de negócio.
6. O service acessa o banco por meio do `PrismaService` quando necessário.
7. O controller retorna a resposta HTTP ao cliente.

## Endpoints e Documentação

O endpoint `GET /health` informa a disponibilidade da API. O endpoint `POST /auth/login` valida as credenciais e retorna um JWT. Com a aplicação em execução, a documentação Swagger fica disponível em `http://localhost:3000/api-docs`.
