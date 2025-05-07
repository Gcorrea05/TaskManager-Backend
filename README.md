
# 🚀 TaskManager Backend

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js](https://img.shields.io/badge/node-%3E=18-green)

Backend do projeto **Task Manager** — construído com **Node.js + TypeScript + Express + MySQL**.  
Este projeto oferece um sistema completo de gerenciamento de tarefas com autenticação JWT, CRUD de tarefas e subtarefas, e cálculo automático de progresso.

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

---

## ⚙️ Como rodar o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/TaskManager-Backend.git
cd TaskManager-Backend
```

---

### 2️⃣ Instale as dependências

```bash
npm install
```

---

### 3️⃣ Configure o ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=task_manager_db

JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

### 4️⃣ Configure o banco MySQL

Execute no MySQL:

```sql
CREATE DATABASE task_manager_db;

USE task_manager_db;

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
```

---

### 5️⃣ Rode o projeto

```bash
npm run dev
```

Servidor disponível em:
```
http://localhost:3000
```

---

## 🔐 Autenticação

Todas as rotas de tasks e subtasks exigem JWT.

Header esperado:
```
Authorization: Bearer <seu_token_jwt>
```

---

## 📚 Principais rotas

### 🧑 Auth
| Método | Rota                  | Descrição            |
|--------|------------------------|----------------------|
| POST   | `/api/auth/register`  | Cria novo usuário   |
| POST   | `/api/auth/login`     | Login e gera token  |

### 📋 Tasks (protegido)
| Método | Rota                 | Descrição                  |
|--------|-----------------------|----------------------------|
| GET    | `/api/tasks`         | Lista todas as tarefas    |
| POST   | `/api/tasks`         | Cria uma nova tarefa      |
| PUT    | `/api/tasks/:id`     | Atualiza progresso        |
| DELETE | `/api/tasks/:id`     | Remove tarefa            |

### 🧩 Subtasks (protegido)
| Método | Rota                              | Descrição                   |
|--------|------------------------------------|-----------------------------|
| GET    | `/api/subtasks/:taskId`          | Lista subtarefas da tarefa |
| POST   | `/api/subtasks/:taskId`          | Cria uma nova subtarefa    |
| PUT    | `/api/subtasks/:id`              | Atualiza status subtarefa  |
| DELETE | `/api/subtasks/:id/:taskId`      | Remove subtarefa           |

---

## 💻 Scripts úteis

| Script         | Descrição                                      |
|----------------|-----------------------------------------------|
| `npm run dev` | Inicia servidor com `ts-node` + `nodemon`      |
| `npm run build` | Compila TypeScript para JavaScript (`dist/`) |
| `npm start`    | Roda versão compilada                         |

---

## 📂 Estrutura do projeto

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── app.ts
├── server.ts
```

---

## 🛡️ Segurança

⚠ **Nunca** suba o arquivo `.env` no GitHub!  
⚠ Use uma senha forte para `DB_PASSWORD` e `JWT_SECRET`.

---

## 📬 Dúvidas?

Abra uma issue no repositório ou entre em contato!  
Bons códigos 🚀
