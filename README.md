# meu-ecommerce

Front-end de um pequeno e-commerce feito com Next.js, React, TypeScript e Tailwind CSS. Tem uma vitrine pública, página de detalhes, carrinho de compras e um painel administrativo com CRUD de produtos. Os dados vêm da API REST do projeto [produtos](https://github.com/vitorrodrigues-dev/spring-boot-estudos/tree/main/produtos), do repositório spring-boot-estudos.

| Projeto | Origem |
|---|---|
| meu-ecommerce | Desenvolvido guiado, seguindo o Estudo de Caso Parte II – Front-end do curso (FIAP) |

## Tecnologias

- Next.js 16 (App Router, Server e Client Components, API Routes)
- React 19 (useState, useEffect e useContext)
- TypeScript
- Tailwind CSS 4

## Estrutura do projeto

```
src/
├── app/
│   ├── api/dashboard/   API Routes que funcionam como proxy para o back-end
│   ├── dashboard/       painel administrativo (login, listagem, novo e editar)
│   ├── produtos/[id]/   página de detalhes do produto
│   ├── carrinho/        página do carrinho
│   └── page.tsx         vitrine com a lista de produtos
├── components/          Header, Footer, ProdutoCard, AddToCartButton e CartSummary
├── context/             CartContext, estado do carrinho compartilhado com useContext
└── interfaces/          interface Produto
```

## Páginas

| Rota | O que faz |
|---|---|
| / | Vitrine com todos os produtos (Server Component) |
| /produtos/{id} | Detalhes do produto e botão de adicionar ao carrinho |
| /carrinho | Itens do carrinho, total e opção de remover ou esvaziar |
| /dashboard/login | Login administrativo |
| /dashboard | Tabela de produtos com Editar e Excluir |
| /dashboard/novo | Cadastro de produto |
| /dashboard/produto/{id}/editar | Edição de produto |

## API Routes (proxy)

O navegador não chama o back-end direto. As API Routes do Next.js recebem a requisição e repassam para a URL definida em `API_URL`.

| Verbo | URL no Next.js | Repassa para |
|---|---|---|
| POST | /api/dashboard/login | Validação local com credenciais fixas |
| GET | /api/dashboard/produtos | GET /api/produtos |
| POST | /api/dashboard/produtos | POST /api/produtos |
| GET | /api/dashboard/produtos/{id} | GET /api/produtos/{id} |
| PUT | /api/dashboard/produtos/{id} | PUT /api/produtos/{id} |
| DELETE | /api/dashboard/produtos/{id} | DELETE /api/produtos/{id} |

## Como rodar

1. Suba a API do projeto [produtos](https://github.com/vitorrodrigues-dev/spring-boot-estudos/tree/main/produtos). Ela precisa estar em `http://localhost:8080`.
2. Na raiz deste projeto, crie o arquivo `.env`. Ele não vem no repositório, pois está no `.gitignore`:

```
API_URL=http://localhost:8080
NEXT_PUBLIC_SELF_URL=http://localhost:3000
```

3. Instale as dependências e rode o servidor de desenvolvimento:

```
npm install
npm run dev
```

4. Acesse `http://localhost:3000`.

Login do painel administrativo (credenciais fixas, só para estudo):

- E-mail: `admin@exemplo.com`
- Senha: `admin123`

## Ajustes em relação ao material

Alguns trechos do material não funcionavam como estavam escritos e foram ajustados:

- O PUT ficou em `api/dashboard/produtos/[id]/route.ts`, porque usa o id da URL, igual à API (`PUT /api/produtos/{id}`).
- A página de edição e a de detalhes chamam `/api/dashboard/produtos/{id}`. O material usava `/api/produtos/{id}`, uma rota que não é criada.
- O botão "Novo Produto" aponta para `/dashboard/novo`, onde a página é criada.
- A vitrine monta a URL do fetch com `NEXT_PUBLIC_SELF_URL`, porque um Server Component não aceita URL relativa.

## Em andamento

- [ ] Autenticação real (hoje o token é fictício e fica no localStorage; o ideal é cookie HttpOnly com validação no servidor)
- [ ] Impedir que o botão "Adicionar ao carrinho" do card também abra a página de detalhes (hoje ele fica dentro do link do card)
- [ ] Paginação na lista de produtos
- [ ] Validação de formulários mais completa

## Sobre o processo

O código foi implementado com apoio de IA (Claude Code), seguindo o passo a passo do capítulo como exercício de revisão e consolidação, sem recursos além dos ensinados no material.
