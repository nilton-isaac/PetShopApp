# PetShopApp

Projeto da faculdade para criar um app simples de pet shop que permita o usuário cadastrar seus dados e os do pet, e consiga entrar em contato com um motorista vizinho para levar seu pet para ter um atendimento. Principalmente em casos onde ele não tempo para levar o pet, e o pet seria apenas um pet de visita.

## Como executar o frontend

1. Instale as dependências (apenas na primeira vez):

   ```bash
   cd app
   npm install
   ```

2. Suba o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

Caso o `npm install` falhe por não conseguir baixar o pacote `@vitejs/plugin-react`, não se preocupe: a configuração atual utiliza apenas dependências públicas sem escopo especial, evitando esse bloqueio.

## Fluxo inicial mobile-first

O frontend foi reestruturado para seguir um fluxo pensado para telas de celular, inspirado nos esboços presentes na pasta `Sketch/`:

- **Boas-vindas / Onboarding** — apresenta a proposta do app com mensagens randômicas, guia de passos e botões para criação de conta ou login.
- **Cadastro de tutor e pets** — formulários responsivos para coletar dados básicos, preferências e observações relevantes para motoristas.
- **Home (Mapa)** — cartão com chips dos pets cadastrados, lista de agendamentos e serviços próximos.
- **Navegação inferior** — abas para `Mapa`, `Meus Pets`, `Serviços` e `Perfil`, facilitando o uso por toque.

Os componentes compartilham tokens de cores, tipografia e espaçamento definidos em `app/src/styles/tokens.css`, priorizando uma experiência consistente em smartphones.
