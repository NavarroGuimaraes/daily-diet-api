# daily-diet-api

## Table of Contents

- [Sobre](#sobre)
- [Regras da aplicação](#regras)
- [Usage](#usage)

## Sobre <a name = "sobre"></a>

Este é um desafio da trilha de node 2023 da rocketseat. 

## Regras da aplicação <a name = "regras"></a>

- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:
    
    *As refeições devem ser relacionadas a um usuário.*
    
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### Pré-requisitos

Será necessário ter o node instalado em seu computador.
A IDE pode ser de sua escolha. Para desenvolver esse projeto, usei o VSCode

### Installing

Instalação clássica de um projeto node.

```
npm install
```

Quanto as migrações

- Para criar uma nova migração: ```npm run kex -- migrate:make <the name of your migration>```
- Para executar as últimas migrações: ```npm run kex -- migrate:latest```
- Para fazer rollback na última migração: ```npm run kex -- migrate:rollback```


## Usage <a name = "usage"></a>

Neste projeto, nós temos 2 resources. `/users` e `/meals`. Primeiro, é necessário criar um usuário e realizar o login. As refeições serão automaticamente vinculadas ao usuário logado. Além disso, as refeições que irão aparecer serão apenas às relacionadas ao usuário logado. Ele também só poderar criar, editar e excluir refeições ligadas a ele.

Aqui está a documentação para as rotas fornecidas:

---

## Rotas de Usuários

Primeiro vamos falar das rotas de usuários:

### POST users/

Endpoint para criar um novo usuário.

#### Parâmetros de Requisição

- Corpo da Requisição:
  ```json
  {
    "name": "Nome do Usuário",
    "email": "email@example.com",
    "password": "senha"
  }
  ```

#### Resposta de Sucesso

- Status: 201 Created
- Corpo da Resposta:
  ```json
  {
    "message": "Usuário criado com sucesso"
  }
  ```

### POST users/login

Endpoint para fazer login de um usuário existente.

#### Parâmetros de Requisição

- Corpo da Requisição:
  ```json
  {
    "email": "email@example.com",
    "password": "senha"
  }
  ```

#### Resposta de Sucesso

- Status: 200 OK
- Corpo da Resposta:
  ```json
  {
    "message": "Login realizado com sucesso"
  }
  ```

#### Cookies

- `userId`: Token JWT de autenticação do usuário.

### POST users/logout

Endpoint para fazer logout do usuário atualmente autenticado.

#### Resposta de Sucesso

- Status: 200 OK
- Corpo da Resposta:
  ```json
  {
    "message": "Logout realizado com sucesso"
  }
  ```

#### Cookies

- `userId`: O cookie de autenticação é removido.

---

Ok, agora que falamos sobre os endpoints de usuários, vamos aos endpoints de refeições:

---

## Rotas de Refeições

### GET meals/

Endpoint para obter todas as refeições do usuário autenticado.

#### Parâmetros de Requisição

Nenhum.

#### Resposta de Sucesso

- Status: 200 OK
- Corpo da Resposta:
  ```json
  {
    "meals": [
      {
        "id": 1,
        "name": "Nome da Refeição",
        "description": "Descrição da Refeição",
        "created_at": "2024-02-26 00:00:00",
        "inDiet": true
      },
      {
        "id": 2,
        "name": "Outra Refeição",
        "description": "Descrição da Outra Refeição",
        "created_at": "2024-02-26 00:00:00",
        "inDiet": false
      }
    ]
  }
  ```

### POST meals/

Endpoint para criar uma nova refeição para o usuário autenticado.

#### Parâmetros de Requisição

- Corpo da Requisição:
  ```json
  {
    "name": "Nome da Refeição",
    "description": "Descrição da Refeição",
    "inDiet": true
  }
  ```

#### Resposta de Sucesso

- Status: 201 Created
- Corpo da Resposta:
  ```json
  {
    "message": "Refeição criada com sucesso"
  }
  ```

### GET meals/:id

Endpoint para obter uma refeição específica do usuário autenticado pelo seu ID.

#### Parâmetros de Requisição

- `id`: ID da refeição a ser obtida.

#### Resposta de Sucesso

- Status: 200 OK
- Corpo da Resposta:
  ```json
  {
    "meal": {
      "id": 1,
      "name": "Nome da Refeição",
      "description": "Descrição da Refeição",
      "created_at": "2024-02-25T12:00:00Z",
      "inDiet": true
    }
  }
  ```

### PUT meals/:id

Endpoint para atualizar uma refeição específica do usuário autenticado pelo seu ID.

#### Parâmetros de Requisição

- `id`: ID da refeição a ser atualizada.
- Corpo da Requisição:
  ```json
  {
    "name": "Novo Nome da Refeição",
    "description": "Nova Descrição da Refeição",
    "inDiet": false
  }
  ```

#### Resposta de Sucesso

- Status: 200 OK
- Corpo da Resposta:
  ```json
  {
    "meal": 1
  }
  ```

### DELETE meals/:id

Endpoint para excluir uma refeição específica do usuário autenticado pelo seu ID.

#### Parâmetros de Requisição

- `id`: ID da refeição a ser excluída.

#### Resposta de Sucesso

- Status: 204 No Content

---


