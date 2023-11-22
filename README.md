# App de Lembretes 
O App de Lembretes é uma aplicação web simples para criar e gerenciar lembretes com datas específicas.

## Código Construído
Este projeto foi construído utilizando as seguintes tecnologias:

- **Frontend**: HTML, CSS e JavaScript puro.
- **Backend**: Spring Boot com Java, utilizando o Spring Data JPA para interação com o banco de dados.

## Premissas Assumidas

Para o desenvolvimento deste app, foram assumidas as seguintes premissas:

- Os usuários desejam uma interface simples e intuitiva para gerenciar lembretes.
- Cada lembrete é composto por um nome e uma data.
- Lembretes na mesma data devem ser agrupados visualmente.
- Ao remover todos os lembretes de uma data específica, essa data deve desaparecer da visualização.

## Decisões de Projeto

Durante o projeto, as seguintes decisões foram tomadas:

- Optou-se por uma abordagem sem frameworks de frontend para manter a simplicidade e a facilidade de manutenção.
- A aplicação não utiliza autenticação por motivos de simplicidade e demonstração.
- O backend utiliza o Spring Boot pela sua vasta documentação, ampla comunidade e facilidades na criação de APIs REST.

## Instruções para Executar o Sistema

Para executar este projeto localmente, siga as etapas abaixo:

### Pré-Requisitos

- Java JDK 11 ou superior.
- Maven para gerenciar as dependências do projeto.

### Backend

1. Navegue até o diretório [Raiz do Backend](./src/main/java/br/com/dtilembrete/projetodtilembrete).
2. Execute `mvn spring-boot:run` para iniciar o servidor Spring Boot.
3. O servidor estará rodando em `http://localhost:8080`.

### Frontend

1. Navegue até o diretório raiz do frontend.
2. Se estiver usando um servidor estático como o `http-server` do Node.js, execute `http-server .` dentro do diretório.
3. Caso use o Visual Studio Code, instale a extensão live server e execute (Opcional).
4. Acesse `http://localhost:8080` no seu navegador (Caso decida seguir pela etapa 3, essa etapa é desconsiderada).

### Especificações Banco de Dados MYSQL
Foi criado uma única tabela no Banco de Dados MySQL. [Comandos para inicialização do Banco de Dados MySQL](./src/main/resources/static/initBD.sql).
Copie os comandos, cole na sua base de dados e execute.

### Aplications properties
No arquivo [aplication.properties](./src/main/resources/application.properties), é preciso especificar o dbusername, password e também o host referente ao seu database no MySQL.

spring.datasource.username = dbusername

spring.datasource.password = dbpassword

spring.datasource.url = dbpath

spring.jpa.properties.hibernate.dialec = org.hibernate.dialect.MySQLDialect

spring.jpa.show-sla = true

#### Detalhes do Java Spring
Projeto em Maven

Spring boot version: 3.1.5

Packaging: Jar

Java Version: 21

Para ver os lembretes, simplesmente visite a página principal. Para adicionar um lembrete, preencha os campos de texto e clique em "Criar". Para remover um lembrete, clique no botão 'x' ao lado do lembrete que deseja remover.
