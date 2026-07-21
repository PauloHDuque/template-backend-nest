# Padrões de Código

## Nomenclatura

- Variáveis devem usar `camelCase`.
- Pastas devem usar `kebab-case`.
- Tabelas e colunas do banco de dados devem usar `snake_case`.

## Branches

Os nomes das branches devem começar com um dos prefixos abaixo, sempre seguido por uma barra:

- `feature/`
- `bugfix/`
- `release/`
- `hotfix/`
- `support/`

Exemplo: `feature/adiciona-autenticacao`.

## Fluxo de Trabalho no GitLab

Sempre lembre de mover as tasks concluídas para a coluna Done no GitLab.

## Commits

As mensagens de commit devem seguir o formato:

```text
<type>: <description>
```

### Tipos Permitidos

- `feat` - Adiciona uma nova funcionalidade.
- `fix` - Corrige um defeito.
- `docs` - Altera a documentação.
- `perf` - Melhora o desempenho.
- `style` - Altera formatação ou espaços sem modificar o comportamento.
- `refactor` - Altera o código sem corrigir defeitos ou adicionar funcionalidades.
- `test` - Adiciona ou modifica testes.
- `chore` - Altera tarefas de build, configurações ou dependências.

### Descrição

A descrição deve ser clara, concisa e escrita na terceira pessoa do presente do indicativo. Ela deve explicar objetivamente o que foi realizado.

Exemplos:

- `feat: adiciona autenticação`
- `fix: corrige erro`

O commitlint valida o padrão por meio do hook `commit-msg` do Husky. O hook `pre-commit` executa o lint-staged, enquanto o hook `pre-push` executa lint, testes unitários e testes E2E.
