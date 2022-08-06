#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
   CREATE TABLE IF NOT EXISTS tb_usuario (
	    cpf VARCHAR(11) PRIMARY KEY NOT NULL,
        nome VARCHAR(100) NOT NULL,
        administrador boolean NOT NULL,
        email VARCHAR(100),
        senha VARCHAR(100),
        data_criacao DATE NOT NULL DEFAULT NOW()
    );

    create TABLE IF NOT EXISTS tb_fotos (
	    idFoto SERIAL PRIMARY KEY,
        cpf VARCHAR(100) REFERENCES tb_usuario(cpf),
        foto text NOT NULL
    );
  COMMIT;
EOSQL