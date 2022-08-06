# Api de Usuários
Esse repositório contém o código referente à API de Usuários para o projeto Catraca da disciplina Projeto Integrador 2 2022-1.  

## Tecnologias utilizadas
- Node.js
- Postgres
- PgAdmin
- Docker

## Requisitos
- Docker/Docker Compose ou gerenciador de pacotes node ( NPM ou Yarn ) 
- Ferramenta cliente de API REST ( Postman, Insomnia, etc)  

## Como executar o projeto
Após clonar o repositório, é necessário configurar as variáveis de ambiente (arquivo `.env` ) para realizar a conexão com o banco de dados:   
~~~
PGHOST={Nome do host. Com o docker, é o nome do serviço do banco de dados}
PGUSER={Usuário do postgres}
PGPASSWORD={Senha do usuário}
PGDATABASE={Nome da base de dados}
PGPORT={Porta do banco. Padrao: 5432}
~~~
### Executar com Docker
Após clonar o repositório, execute o comando:  
~~~
docker-compose up --build
~~~
Será criada a api, o banco de dados e uma instância do PgAdmin para consultas ao banco de dados.  

As rotas disponíveis serão:  
- Api: http://localhost:5000  
- PgAdmin: http://localhost:16543  

### Executar sem Docker
Após clonar o repositório, instale as dependências com o gerenciador de pacotes node:  
~~~
yarn install ou npm install
~~~
Para iniciar o projeto, execute:  
~~~
yarn start ou npm run start
~~~
Para executar em modo de desenvolvimento:  
~~~
yarn dev ou npm run dev
~~~

As rotas disponíveis serão:  
- Api: http://localhost:5000  

## Configuração do PgAdmin
Acesse http://localhost:16543 e realize o login com as credenciais definidas. Por padrão:  
~~~
login: adm@email.com
senha: adm123
~~~
  
1. Na página inicial, clique em 'Add new server'.  
2. Na aba 'General', coloque um nome para o servidor.  
3. Na aba 'Connection':  
   1. No campo 'Host name/address' coloque o nome do serviço do docker referente ao banco de dados  
   2. No campo 'Port' coloque a porta definida. Padrão: 5432  
   3. Em 'Username' o usuário do banco de dados  
   4. Em 'Password' a senha do usuário do banco de dados  

Com essa configuração básica será possível conectar ao banco de dados.  

## Rotas da API
Url base: http://localhost:5000/api  
Vale lembrar que as fotos serão enviadas em base64.
### Usuários
#### Cadastro de usuários
**POST** `/usuario/novo`  
Body:  
~~~JSON
{
    "cpf": "string" required,
    "nome": "string" required,
    "administrador": boolean required,
    "email": "string" required,
    "senha": "string" required,
    "fotos": [ "string" ]
}
~~~  
#### Buscar todos os usuários
**GET** `/usuario/todos`  

#### Buscar usuário por cpf
**GET** `/usuario/cpf/:cpf`  

### Fotos
#### Cadastrar fotos para um usuário
**POST** `/fotos/nova`  
Body:  
~~~JSON
{
    "cpf": "string" required,
    "fotos": ["string"] required
}
~~~  

#### Recuperar todas as fotos
**GET** `/fotos/todas`  

#### Recuperar as fotos de um usuário específico
**GET** `/fotos/usuario/:cpf`  
