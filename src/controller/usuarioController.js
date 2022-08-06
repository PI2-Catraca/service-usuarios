import CryptoJS from 'crypto-js';
import Database from '../config/db.js';

const getUserQuery = async (cpf) => {
    const user = await Database.query(`SELECT * FROM tb_usuario WHERE cpf = $1`, [cpf]);
    return user;
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
        senha
    } = req.body;

    const hashPassword = CryptoJS.MD5(senha);

    if (!cpf || !nome || !email || !senha || (administrador === null || administrador === undefined))
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
            .query(`INSERT INTO tb_usuario (cpf, nome, administrador, email, senha) VALUES ($1, $2, $3, $4, $5)`,
                [cpf, nome, administrador, email, hashPassword]
            );

        res.status(201).send({
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