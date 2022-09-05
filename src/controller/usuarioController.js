import axios from 'axios';
import CryptoJS from 'crypto-js';
import Database from '../config/db.js';
import { postFotoQuery } from './fotosController.js';

const getUserQuery = async (cpf) => {
    const user = await Database.query(`SELECT cpf, nome, email FROM tb_usuario WHERE cpf = $1`, [cpf]);
    return user;
}

const getUsuarioByEmail = async (email) => {
    const user = await Database.query(`SELECT * FROM tb_usuario WHERE email = $1`, [email]);
    return user;
}

export const getAllUsuarios = async (req, res) => {
    try {
        const { rows } = await Database.query(`SELECT cpf, nome, email FROM tb_usuario`);
        if (rows.length > 0)
            return res.status(201).send({
                message: "Usuários recuperados com sucesso!",
                data: {
                    usuarios: rows
                }
            });

        return res.status(200).send({
            message: "Não há usuários cadastrados.",
            data: {
                usuarios: []
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar os usuários!",
            data: {
                error
            }
        });
    }
}

export const getUsuarioByCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const usuario = await getUserQuery(cpf);
        console.log('usuario', usuario)
        if (usuario.rows.length > 0)
            return res.status(201).send({
                message: "Usuário encontrado.",
                data: {
                    usuario: usuario.rows[0]
                }
            });

        return res.status(201).send({
            message: "Usuário não encontrado.",
            data: {
                usuario: {}
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao buscar o usuário!",
            data: {
                error
            }
        });
    }
};

export const postUsuario = async (req, res) => {
    const {
        cpf,
        nome,
        administrador,
        email,
        senha,
        fotos
    } = req.body;

    const hashPassword = CryptoJS.MD5(senha);

    if (!cpf || !nome || (administrador === null || administrador === undefined))
        return res.status(400).send({
            message: "Todos os campos são obrigatórios!",
            data: {}
        });

    try {
        const usuario = await getUserQuery(cpf);
        if (usuario.rows.length > 0)
            return res.status(400).send({
                message: "Usuário já cadastrado.",
                data: {}
            });

        const { rows } = await Database
            .query(`INSERT INTO tb_usuario (cpf, nome, admin, email, senha) VALUES ($1, $2, $3, $4, $5)`,
                [cpf, nome, administrador, email, hashPassword]
            );

        if (fotos?.length > 0) {
            Promise.all(fotos.map(async (foto) => await postFotoQuery(cpf, foto)));
        }

        const data = JSON.stringify({
            nome,
            cpf
        })

        console.log(data)

        const response = await axios.get('https://6352-2804-1b3-6180-ae75-fc5f-95c1-a61e-dbc4.sa.ngrok.io', {
            data
        }).catch((err) => console.log(err));

        console.log(response)

        return res.status(201).send({
            message: "Usuário cadastrado com sucesso!",
            data: {}
        });

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao cadastrar o usuário!",
            data: {
                error
            }
        });
    };
};

export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // const hashPassword = CryptoJS.MD5(password);

    if (!email || !password) {
        return res.status(400).send({
            message: "Todos os campos são obrigatórios",
            data: {}
        });
    }

    try {
        const usuario = await getUsuarioByEmail(email);
        if(usuario.rows.length <= 0) {
            return res.status(400).send({
                message: "E-mail ou senha incorretos",
                data: {}
            });
        }

        if(usuario.senha === password) {
            return res.status(200).send({
                message: "Login realizado com sucesso",
                data: {}
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao realizar o login.",
            data: {
                error
            }
        });
    }
}
