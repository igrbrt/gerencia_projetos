CREATE TABLE membros (
	idprojeto bigserial NOT NULL,
	idpessoa bigserial NOT NULL,
CONSTRAINT pk_projeto_pessoa PRIMARY KEY (idprojeto,idpessoa),
CONSTRAINT fk_membros_projeto FOREIGN KEY (idprojeto) REFERENCES projeto (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT fk_membros_pessoa FOREIGN KEY (idpessoa) REFERENCES pessoa (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);
