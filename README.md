# PetShopApp

Projeto de faculdade: app de pet shop com foco em cadastro de pets, visualização de serviços próximos no mapa e navegação simples.

## O que está incluso (MVP simplificado)
- Cadastro de pets (lista e formulário) com persistência em `localStorage`.
- Mapa com serviços próximos: usa API local opcional, com fallback para dados simulados.
- Navegação entre telas: `Home`, `Meus Pets`, `Serviços`, `Perfil`.
- Layout responsivo pensado para celular e desktop.

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

Observação: o app funciona sem backend. O mapa exibe dados simulados se a API opcional não estiver rodando.

## Backend opcional (API de locais)
Se quiser ver locais reais (seed) no mapa:
1. Instale as dependências:
   ```bash
   cd server
   npm install
   ```
2. Inicie a API:
   ```bash
   npm run dev
   ```
3. Popule com dados de exemplo (em outro terminal):
   ```bash
   # PowerShell
   Invoke-RestMethod -Uri http://localhost:3001/seed -Method Post
   ```
4. A Home consumirá `http://localhost:3001/locations`. Se a API estiver offline, o app cai para dados simulados automaticamente.

## Entrega (sem ZIP)
A professora não gosta de arquivos zipados. Entregue assim:
- Publique no GitHub e envie apenas o link do repositório.
- Opcional: inclua um vídeo curto mostrando a navegação.

Passo a passo (resumo):
1. Crie o repositório no GitHub (nome sugerido: `PetShopApp`).
2. No projeto local, inicialize e suba:
   ```bash
   # dentro de c:\Users\isaac\OneDrive\Área de Trabalho\Faculdade\PetShopApp
   git init
   git add .
   git commit -m "Entrega do projeto de faculdade"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/PetShopApp.git
   git push -u origin main
   ```
3. Entregue o link: `https://github.com/<seu-usuario>/PetShopApp`.

Dica: se quiser um link acessível do app sem pedir para instalar nada, use `npm run build` dentro de `app` e publique a pasta `app/dist` no GitHub Pages. (Opcional, não necessário para a avaliação se o repositório estiver claro.)

## Estrutura
```
PetShopApp/
├── app/           # Frontend React + Vite
│   └── src/       # Páginas, componentes e estado (localStorage nos pets)
└── server/        # Backend opcional com Express + sql.js
```

## Critérios atendidos
- Funcionalidades essenciais: cadastro/lista de pets; categorias de serviços; mapa de pet shops.
- Layout responsivo: navegação inferior e páginas otimizadas para celular.
- Ambiente simples: Node + Vite; Expo/RN não é necessário para esta entrega.

## Observações
- Sem autenticação/pagamento para reduzir complexidade.
- O backend é opcional e não impede o uso do app.
- Qualquer dúvida, ver `app/src/state/AppState.jsx` (persistência de pets) e `app/src/services/locations.js` (dados do mapa).
