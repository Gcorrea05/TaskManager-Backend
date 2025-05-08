# 🚀 TaskManager Backend  
**Node.js + TypeScript + Express + MySQL | JWT | bcrypt**

Backend oficial do projeto **Task Manager**, oferecendo sistema completo de autenticação, gerenciamento de usuários, tarefas e subtarefas, com integração ao frontend via API REST protegida.

---

## 📦 Pré-requisitos

Antes de começar, tenha instalado:
- [Node.js](https://nodejs.org/) (recomendado: versão 18 ou superior)  
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)  
- [MySQL](https://www.mysql.com/)

---

## 📁 Como clonar o repositório

```bash
git clone https://github.com/seu-usuario/TaskManager-Backend.git
cd TaskManager-Backend
📥 Instalar as dependências
bash
Copiar
Editar
npm install
# ou
yarn install
✅ As principais dependências incluem:

Express → servidor web

TypeScript → tipagem estática

MySQL2 → conexão com banco

bcrypt → hash de senha

jsonwebtoken → geração e validação de tokens

uuid → geração de IDs únicos

⚙️ Configuração do arquivo .env
Na raiz do projeto, crie o arquivo .env com este conteúdo:

ini
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=task_manager
DB_PORT=3306

JWT_SECRET=sua_chave_super_secreta
PORT=3000
✅ Explicação:

DB_HOST → host do MySQL (geralmente localhost)

DB_USER → usuário do MySQL (ex: root)

DB_PASSWORD → senha do seu banco

DB_NAME → nome do banco (ex: task_manager)

DB_PORT → porta MySQL padrão (3306)

JWT_SECRET → segredo para assinar tokens JWT

PORT → porta que o backend vai escutar (3000)

🛠️ Configurar banco de dados
No MySQL, execute:

sql
Copiar
Editar
CREATE DATABASE task_manager;

USE task_manager;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    progress INT,
    assigned_to VARCHAR(255),
    assigned_by VARCHAR(255),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (assigned_by) REFERENCES users(id)
);

CREATE TABLE subtasks (
    id VARCHAR(255) PRIMARY KEY,
    task_id VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
▶️ Como rodar o projeto
bash
Copiar
Editar
npm run dev
# ou
yarn dev
✅ O backend estará disponível em:

arduino
Copiar
Editar
http://localhost:3000
🔐 Autenticação
✅ Todas as rotas protegidas exigem token JWT no header:

makefile
Copiar
Editar
Authorization: Bearer <seu_token_jwt>
O login gera um token válido que deve ser enviado em cada requisição autenticada.

📚 Principais rotas
Categoria	Método	Rota	Descrição
🧑 Auth	POST	/api/auth/register	Cria novo usuário
POST	/api/auth/login	Login e gera token
👥 Users	GET	/api/users	Lista todos os usuários
📋 Tasks	GET	/api/tasks	Lista todas as tarefas
(protegido)	POST	/api/tasks	Cria nova tarefa
PUT	/api/tasks/:id	Atualiza progresso tarefa
DELETE	/api/tasks/:id	Remove tarefa
🧩 Subtasks	GET	/api/subtasks/:taskId	Lista subtarefas da tarefa
POST	/api/subtasks/:taskId	Cria nova subtarefa
PUT	/api/subtasks/:id	Atualiza status subtarefa
DELETE	/api/subtasks/:id/:taskId	Remove subtarefa

💻 Scripts úteis
Script	Descrição
npm run dev	Inicia servidor com ts-node + nodemon (dev)
npm run build	Compila TypeScript para JavaScript (dist/)
npm start	Roda versão compilada em produção

📂 Estrutura principal
pgsql
Copiar
Editar
src/
├── controllers/   → lógica das rotas
├── models/        → acesso ao banco
├── routes/        → definição das rotas Express
├── middleware/    → autenticação, erros
├── app.ts         → configuração do Express
├── server.ts      → inicialização do servidor
🛡️ Segurança
⚠ Nunca suba o arquivo .env no GitHub!
⚠ Use senhas fortes para DB_PASSWORD e JWT_SECRET.
⚠ O projeto foi projetado para uso privado; ajuste permissões conforme necessário.

📬 Suporte
Este projeto é privado e mantido exclusivamente por Gabriel Correa.
Para dúvidas ou suporte, contate diretamente.

Bons códigos 🚀

yaml
Copiar
Editar
