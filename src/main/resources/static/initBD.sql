create database banco_de_lembretes_dti;

use banco_de_usuarios;

create table lembretes(
	id				integer auto_increment primary key,
    nome			varchar(200) not null,
    data_lembrete  	datetime not null
);