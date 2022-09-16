#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
    CREATE TABLE tb_usuario (
      cpf VARCHAR(11) PRIMARY KEY,
      nome varchar(100),
      admin boolean,
      email varchar(100) UNIQUE,
      senha varchar(100)
    );

    INSERT INTO tb_usuario (cpf, nome, admin, email, senha)
      VALUES ('00000000191', 'admin', true, 'admin@email.com', '\$2b\$10\$TRufaxXaudbGydIpRH6Pn.XZqGZXaLG/po4sInwkKi.7C.yDKPkIy');
    
    CREATE TABLE tb_foto (
      idFoto SERIAL PRIMARY KEY,
      Usuario_cpf VARCHAR(11),
      foto text,
      tipo VARCHAR(1)
    );

    CREATE TABLE tb_catraca (
      idCatraca INTEGER PRIMARY KEY,
      local VARCHAR(50)
    );

    CREATE TABLE tb_User_Catraca (
      id_user_catraca SERIAL,
      Usuario_cpf VARCHAR(11),
      Catraca_idCatraca INTEGER,
      datahora timestamp NOT NULL DEFAULT NOW(),
    );

    ALTER TABLE tb_foto ADD CONSTRAINT FK_Foto_2
      FOREIGN KEY (Usuario_cpf)
      REFERENCES tb_usuario (cpf)
      ON DELETE RESTRICT;

    ALTER TABLE tb_User_Catraca ADD CONSTRAINT FK_User_Catraca_1
      FOREIGN KEY (Usuario_cpf)
      REFERENCES tb_usuario (cpf);

    ALTER TABLE tb_User_Catraca ADD CONSTRAINT FK_User_Catraca_2
      FOREIGN KEY (Catraca_idCatraca)
      REFERENCES tb_catraca (idCatraca);
  COMMIT;
EOSQL