# Visão Geral do Projeto Zeus

## 1. Resumo do projeto
Zeus é um aplicativo web financeiro inteligente, concebido como um assistente pessoal estilo "Nubank" voltado para gerenciamento de mesadas e investimentos. O app permite acompanhar gastos, prever rendimentos (CDI), gerenciar diferentes fontes de entrada e criar metas financeiras. 

A interface foca na usabilidade móvel com um visual premium, apostando em um design limpo, tons de "deep teal" e tipografia moderna para incentivar o uso diário.

## 2. Arquitetura
A aplicação é construída sob a stack Next.js 14 com **App Router**, fornecendo páginas protegidas e server-rendered.
As **Server Actions** lidam com a mutação de dados diretamente do formulário para o banco de dados via Drizzle ORM, dispensando a criação de rotas tradicionais de API.
Os dados são armazenados na nuvem através do **Neon PostgreSQL Serverless**, garantindo alta disponibilidade sem custos altos de infraestrutura contínua.

## 3. Banco de Dados (Schema)
O banco de dados usa as seguintes tabelas (Drizzle):
- `users`: Usuários do sistema.
- `settings`: Configurações de mesada, CDI, dark mode e etc. Relacionado por `userId`.
- `expenses`: Despesas registradas (valor, categoria, nota, etc).
- `income`: Fontes de renda diversas (mesada, estágio, presente, etc).
- `investments`: Entradas de investimentos realizados.
- `savings_goals`: Metas de economia com valor, ícone, cor, e status de conclusão.
*Existem também as tabelas auxiliares para o funcionamento do next-auth (`account`, `session`, `verificationToken`).*

## 4. Autenticação
A autenticação é feita com **Next-Auth v5** em conjunto com a **Resend**.
O usuário informa seu e-mail na tela de login, e o sistema envia um "Magic Link" via e-mail. Ao clicar no link, o usuário é validado sem precisar lembrar senhas, com a sessão sendo gerada e armazenada no banco. Rotas sob `/(app)` são blindadas pelo `middleware.ts`.

## 5. Server Actions
O padrão principal no `src/actions/` envolve funções exportadas com `'use server'`.
A cada ação, a função faz um hit na sessão via `auth()` para validação, insere ou atualiza os dados correspondentes via `db` e invoca a função `revalidatePath` para atualizar dinamicamente as telas como dashboard, gráficos e calendário instantaneamente.

## 6. Componentes principais
- **BottomNav**: Responsável por navegação em visualizações mobile.
- **BalanceCard**: Apresenta de forma resumida e destacada o saldo total disponível no mês e resumo financeiro.
- **BudgetProgress**: Barra de progresso visual de quanto do orçamento atual já foi comprometido.
- **InvestmentSimulator**: Um sandbox onde o usuário pode simular os juros compostos calculados pela taxa do CDI num determinado número de meses.
- **ExpenseForm / IncomeForm**: Interfaces simplificadas e otimizadas para digitação ágil de entradas financeiras.

## 7. Lógica de investimento
O arquivo `investmentCalc.ts` contém as fórmulas de rentabilidade.
A taxa anual do CDI informada pelo usuário (e a porcentagem deste CDI que a corretora oferece, por exemplo, 100%) é primeiramente convertida em uma taxa equivalente mensal (`annualToMonthlyRate`). A simulação de crescimento calcula, mês a mês, a incidência dessa taxa sobre o saldo mais os novos aportes regulares.

## 8. Variáveis de ambiente
- `DATABASE_URL`: URL de conexão PostgreSQL da Neon.
- `AUTH_SECRET`: Segredo de criptografia da sessão do Next-Auth.
- `AUTH_URL`: Endpoint de base da aplicação para a Auth (ex: http://localhost:3000/api/auth).
- `AUTH_RESEND_KEY`: Chave de API da Resend para enviar e-mails de Magic Link.
- `EMAIL_FROM`: E-mail de remetente (ex: onboarding@resend.dev).

## 9. Como rodar localmente
1. Instale as dependências: `npm install`
2. Crie ou configure o arquivo `.env.local` na raiz com os valores indicados.
3. Para garantir que o banco esteja sincronizado, execute: `npx drizzle-kit push`
4. Inicie o servidor: `npm run dev`
5. Acesse `http://localhost:3000`

## 10. Deploy na Vercel
1. Crie um repositório no GitHub ou serviço similar.
2. Acesse a Vercel, crie um novo projeto importando este repositório.
3. Conecte sua conta do Neon nas integrações nativas da Vercel para auto-injetar a `DATABASE_URL`.
4. Adicione as demais variáveis do `next-auth` e `resend` nas Environment Variables da Vercel.
5. Inicie o deploy e todas as configurações estarão validadas.

## 11. Melhorias futuras
1. Implementação dos relatórios e gráficos reais nas views `Charts` e `Calendar` utilizando Recharts.
2. Adicionar opção de notificação push caso um limite de orçamento seja excedido.
3. Internacionalização (suporte nativo multi-idioma).
4. Sincronização offline-first PWA com Service Workers.
5. Gestão de metas colaborativa (ex: vaquinha com outros usuários do app).
6. Opção de digitalizar comprovantes (upload de imagens).
7. Geração de relatórios PDF automatizados no fim do mês.
8. Machine learning ou análises avançadas para sugerir onde o usuário poderia economizar.
