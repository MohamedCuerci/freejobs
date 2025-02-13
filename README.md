# Chat App com Ruby on Rails 7, Stimulus e ActionCable

Este projeto é um chat em tempo real desenvolvido com **Ruby on Rails 7**, **Stimulus** e **ActionCable**.

![Demonstração do Chat](videos/freechat.mp4) 
(se o videos n carregar basta ir a pasta video/freechat.mp4 para assistir)

## Tecnologias Utilizadas
- Ruby on Rails 7
- ActionCable (WebSockets)
- Stimulus (para interatividade no frontend)
- PostgreSQL (ou outro banco de dados de sua escolha)
- Tailwind CSS (opcional, para estilização)

## Requisitos
- Ruby >= 3.0
- Rails >= 7.0
- Node.js & Yarn
- Redis (para gerenciar as conexões WebSocket)
- PostgreSQL ou SQLite3 (padrão do Rails)

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/chat-app.git
   cd chat-app
   ```
2. Instale as dependências:
   ```sh
   bundle install
   yarn install
   ```
3. Configure o banco de dados:
   ```sh
   rails db:create db:migrate
   ```
4. Inicie o servidor Redis (se necessário):
   ```sh
   redis-server
   ```
5. Inicie o servidor Rails:
   ```sh
   rails s
   ```
6. Acesse o projeto no navegador:
   ```
   http://localhost:3000
   ```

## Estrutura do Projeto
- `app/channels/chat_channel.rb`: Gerencia a comunicação em tempo real via WebSockets.
- `app/javascript/controllers/chat_controller.js`: Controlador Stimulus para interação com a interface do chat.
- `app/models/message.rb`: Model que representa as mensagens enviadas no chat.
- `app/views/messages/_message.html.erb`: Partial para exibir mensagens individuais.

## Funcionamento
- Usuários podem enviar mensagens em tempo real.
- As mensagens são armazenadas no banco de dados.
- ActionCable transmite as mensagens para todos os usuários conectados.
- Stimulus é usado para manipular a UI e exibir novas mensagens instantaneamente.

## Contribuição
Sinta-se à vontade para abrir issues e pull requests para melhorias no projeto.

## Licença
Este projeto está disponível sob a licença MIT.

---

**Autor:** Seu Nome

