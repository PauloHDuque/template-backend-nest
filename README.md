# NestJS Backend Template

A NestJS backend template with Prisma 7, MySQL, JWT authentication, Swagger, validation, Jest, and automated Git hooks.

## Requirements

- Node.js 20.19 or later
- Docker with Docker Compose

## Getting Started

1. Copy `.env.example` to `.env` and replace the JWT secret.
2. Install dependencies with `npm install`.
3. Start MySQL with `docker compose up -d`.
4. Generate the Prisma client with `npm run prisma:generate`.
5. Create a migration with `npm run prisma:migrate`.
6. Seed the database with `npm run prisma:seed`.
7. Start development mode with `npm run start:dev`.

Swagger UI is available at `http://localhost:3000/api-docs`.
