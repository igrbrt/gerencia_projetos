CREATE TABLE pessoa (
	id bigserial NOT NULL,
	nome character varying(100) NOT NULL,
	datanascimento date,
	cpf character varying(14),
	funcionario boolean,
CONSTRAINT pk_pessoa PRIMARY KEY (id));
