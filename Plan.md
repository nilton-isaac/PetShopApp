Plano de Desenvolvimento - PetShop App (MVP)

Este documento descreve as tarefas necessárias para construir a Prova de Conceito (PoC) do aplicativo PetShop, com base nos requisitos levantados e nos designs de UI gerados.

Fase 1: Estrutura e Navegação

[ ] TODO 1: Configurar o Ambiente de Desenvolvimento

[x] Instalar Node.js e Git (Já feito)

[ ] Iniciar um novo projeto React Native usando Expo CLI (npx create-expo-app PetShopApp).

[ ] Instalar as dependências iniciais: React Navigation (@react-navigation/native, @react-navigation/stack) para gerenciar as telas.

[ ] Instalar o Tailwind CSS (ou similar) para estilização, seguindo a identidade visual.

[ ] TODO 2: Criar a Estrutura de Navegação (Stack Navigator)

[ ] Configurar um StackNavigator principal.

[ ] Definir as rotas para as telas: Login, CadastroUsuario, Home, AdicionarPet.

[ ] A tela inicial deve ser a de Login.

Fase 2: Telas de Autenticação e Cadastro

[ ] TODO 3: Desenvolver a Tela de Login

[ ] Criar o componente da tela de Login (LoginScreen.js).

[ ] Construir a UI com base no design (image_2a056a.png), usando os componentes do React Native e a estilização do Tailwind.

[ ] Adicionar os campos de Email e Senha (TextInput).

[ ] Criar o botão "Entrar".

[ ] Criar os links de navegação para "Esqueci minha senha?" (pode ser uma tela placeholder por enquanto) e "Criar Conta".

[ ] Lógica (Simulada): Por enquanto, o login pode ser um simples if/else (ex: se email e senha forem 'teste', navega para a tela Home).

[ ] TODO 4: Desenvolver a Tela de Cadastro de Usuário

[ ] Criar o componente da tela de Cadastro (CadastroUsuarioScreen.js).

[ ] Construir a UI com base no design (image_2a0564.png).

[ ] Adicionar os campos: Nome Completo, Email, Celular, Senha e Confirmar Senha.

[ ] Criar o botão "Cadastrar".

[ ] Adicionar link de navegação para "Já tenho uma conta".

[ ] Lógica (Simulada): Ao cadastrar, pode apenas navegar para a tela Home ou Login.

[ ] TODO 5: Desenvolver a Tela de Cadastro de Pet

[ ] Criar o componente da tela de Adicionar Pet (AdicionarPetScreen.js).

[ ] Construir a UI com base no design (image_2a02c1.png).

[ ] Implementar o uploader de imagem (pode usar o expo-image-picker).

[ ] Adicionar os campos: Nome, Espécie (pode ser um Picker ou componente customizado), Raça, Idade, Porte e Observações.

[ ] Criar o botão "Salvar Pet".

[ ] Lógica (Simulada): Ao salvar, pode apenas voltar para a tela anterior (a Home).

Fase 3: Tela Principal e Funcionalidade de Mapa

[ ] TODO 6: Desenvolver a Tela Principal (Home com Mapa)

[ ] Criar o componente da tela HomeScreen.js.

[ ] Instalar e configurar a biblioteca de mapas (react-native-maps).

[ ] Renderizar um mapa na tela, centralizado em uma localização fixa (ex: sua cidade).

[ ] Adicionar 3 marcadores (Marker) fixos no mapa para simular os pontos de serviço (Veterinário, Loja, Banho e Tosa).

[ ] Adicionar um botão flutuante (ou na TabBar futuramente) para navegar para a tela AdicionarPet.

[ ] TODO 7 (Opcional - Bônus): Lógica "A para B"

[ ] Ao clicar em um marcador, exibir um Callout (pop-up) com o nome do serviço.

[ ] Adicionar um botão "Ver Rota" no Callout.

[ ] Ao clicar em "Ver Rota", desenhar uma linha (Polyline) no mapa entre a localização do usuário (pode ser um ponto fixo também) e o marcador do serviço.

Fase 4: Finalização e Polimento

[ ] TODO 8: Conectar a Lógica de Estado (SQLite)

[ ] Instalar o expo-sqlite.

[ ] Criar funções para salvar o usuário e o pet no banco de dados local.

[ ] Criar funções para ler os pets e exibi-los em uma lista na HomeScreen (talvez acima ou abaixo do mapa).

[ ] TODO 9: Revisão e Testes

[ ] Navegar por todo o fluxo do aplicativo.

[ ] Testar os cadastros e a exibição do mapa.

[ ] Refinar a UI e garantir que a estilização esteja consistente em todas as telas.