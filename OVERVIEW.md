# Visao Geral do Projeto Zeus

## 1. Resumo do projeto
Zeus e um aplicativo web financeiro pessoal, concebido como um assistente estilo "Nubank" voltado para gerenciamento de mesadas e investimentos. O app permite acompanhar gastos, prever rendimentos (CDI), gerenciar diferentes fontes de entrada e criar metas financeiras.

A interface foca na usabilidade movel com um visual premium, design limpo, tons de "deep teal" e tipografia moderna para incentivar o uso diario.

## 2. Arquitetura
A aplicacao e construida com Next.js 14 e App Router, usando paginas server-rendered e Server Actions.
As Server Actions lidam com a mutacao de dados diretamente do formulario para o banco de dados via Drizzle ORM, dispensando rotas tradicionais de API.
Os dados sao armazenados na nuvem atraves do Neon PostgreSQL Serverless.

## 3. Banco de Dados (Schema)
O banco de dados usa as seguintes tabelas (Drizzle):
- `users`: Mantem o usuario pessoal fixo usado como dono dos dados.
- `settings`: Configuracoes de mesada, CDI, dark mode etc. Relacionado por `userId`.
- `expenses`: Despesas registradas (valor, categoria, nota etc).
- `income`: Fontes de renda diversas (mesada, estagio, presente etc).
- `investments`: Entradas de investimentos realizados.
- `savings_goals`: Metas de economia com valor, icone, cor e status de conclusao.

## 4. Acesso pessoal
O app nao possui autenticacao por e-mail, senha, Magic Link ou sessao.
Como o projeto e de uso pessoal, a aplicacao redireciona diretamente para `/dashboard` e as Server Actions usam automaticamente um usuario local fixo, criado no banco quando necessario.

## 5. Server Actions
O padrao principal em `src/actions/` envolve funcoes exportadas com `'use server'`.
A cada acao, a funcao obtem o usuario pessoal por `getPersonalUserId()`, insere ou atualiza os dados correspondentes via `db` e invoca `revalidatePath` para atualizar telas como dashboard, graficos, calendario, investimentos e configuracoes.

## 6. Componentes principais
- **BottomNav**: Responsavel por navegacao em visualizacoes mobile.
- **BalanceCard**: Apresenta de forma resumida e destacada o saldo total disponivel no mes e resumo financeiro.
- **BudgetProgress**: Barra de progresso visual de quanto do orcamento atual ja foi comprometido.
- **InvestmentSimulator**: Sandbox onde o usuario pode simular juros compostos calculados pela taxa do CDI.
- **ExpenseForm / IncomeForm**: Interfaces simplificadas e otimizadas para digitacao agil de entradas financeiras.

## 7. Logica de investimento
O arquivo `investmentCalc.ts` contem as formulas de rentabilidade.
A taxa anual do CDI informada pelo usuario e a porcentagem deste CDI oferecida pela corretora sao convertidas em taxa mensal por `annualToMonthlyRate`. A simulacao calcula, mes a mes, a incidencia dessa taxa sobre o saldo mais os novos aportes regulares.

## 8. Variaveis de ambiente
- `DATABASE_URL`: URL de conexao PostgreSQL da Neon.

## 9. Como rodar localmente
1. Instale as dependencias: `npm install`
2. Crie ou configure o arquivo `.env.local` com `DATABASE_URL`.
3. Para garantir que o banco esteja sincronizado, execute: `npx drizzle-kit push`
4. Inicie o servidor: `npm run dev`
5. Acesse `http://localhost:3000`

## 10. Deploy na Vercel
1. Crie um repositorio no GitHub ou servico similar.
2. Acesse a Vercel e crie um novo projeto importando este repositorio.
3. Conecte sua conta do Neon nas integracoes nativas da Vercel para auto-injetar a `DATABASE_URL`, ou cadastre essa variavel manualmente.
4. Inicie o deploy.

## 11. Melhorias futuras
1. Implementacao dos relatorios e graficos reais nas views `Charts` e `Calendar` utilizando Recharts.
2. Adicionar opcao de notificacao push caso um limite de orcamento seja excedido.
3. Sincronizacao offline-first PWA com Service Workers.
4. Opcao de digitalizar comprovantes (upload de imagens).
5. Geracao de relatorios PDF automatizados no fim do mes.
