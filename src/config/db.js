import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.on('connect', () => {
    console.log('Base de Dados conectado com sucesso!');
});

const query = (text, params) => pool.query(text, params);
const end = async () => pool.end(() => console.log('Pool closed'));
const connect = async () => pool.connect((error) => {
    if (error) console.error(`Erro ao conectar no banco de dados. \n ${error}`);
});

export default {
    query,
    end,
    connect
};