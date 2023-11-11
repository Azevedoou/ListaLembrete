# DtiProject Especificação do que deve ser feito
Fazer uma lista de lembretes em JAVA ou C#

# Especificações Banco de Dados MYSQL
## Tabela "lembretes"
* id: integer, auto_increment, primary_key
* nome: verchar(200), not null
* data_lembrete: datetime, not null

## Aplications properties
Nessa pasta, é preciso especificar o dbusername, password e também o host do database
spring.datasource.username = dbusername
spring.datasource.password = dbpassword
spring.datasource.url = dbpath
spring.jpa.properties.hibernate.dialec = org.hibernate.dialect.MySQLDialect
spring.jpa.show-sla = true