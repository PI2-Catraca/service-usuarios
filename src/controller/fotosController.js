import Database from '../config/db.js';
import { getUserQuery } from './usuarioController.js';

export const postFotoQuery = async (cpf, foto, tipo) => {
    const novafoto = await Database
        .query(`INSERT INTO tb_foto (Usuario_cpf, foto, tipo) VALUES ($1, $2, $3)`,
            [cpf, foto, tipo]
        );
    return novafoto;
}

const getAllFotosQuery = async () => {
    const { rows } = await Database.query(`SELECT * FROM tb_foto`);
    return rows;
}

const getFotosByCpfQuery = async (cpf) => {
    const { rows } = await Database.query(`SELECT * FROM tb_foto WHERE Usuario_cpf = $1`, [cpf]);
    return rows;
}

export const getFotosByCpf = async (req, res) => {
    const { cpf } = req.params;

    if (!cpf)
        return res.status(400).send({
            message: "Informe um cpf.",
            data: {}
        });

    try {
        const usuario = await getUserQuery(cpf);
        if (!usuario.rows.length > 0)
            return res.status(400).send({
                message: "Usuário não encontrado.",
                data: {}
            });

        const fotosUsuario = await getFotosByCpfQuery(cpf);

        return res.status(201).send({
            message: "Fotos recuperadas.",
            data: {
                fotos: fotosUsuario
            }
        });

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar fotos.",
            data: {
                error
            }
        });
    }
}

export const getAllFotos = async (req, res) => {
    try {
        const fotos = await getAllFotosQuery();

        if (fotos.length > 0)
            return res.status(200).send({
                message: "Fotos recuperadas com sucesso.",
                data: {
                    fotos
                }
            });

        return res.status(200).send({
            message: "Não há fotos cadastradas.",
            data: {
                fotos: []
            }
        });

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar fotos.",
            data: {
                error
            }
        });
    }

}

export const postFotos = async (req, res) => {
    const {
        cpf,
        fotos
    } = req.body;

    if (!cpf || !fotos.length > 0)
        return res.status(400).send({
            message: "Todos os campos são obrigatórios!",
            data: {}
        });

    try {
        const usuario = await getUserQuery(cpf);
        if (!usuario.rows.length > 0)
            return res.status(400).send({
                message: "Usuário não encontrado.",
                data: {}
            });

        Promise.all(fotos.map(async (foto) => await postFotoQuery(cpf, foto)));

        return res.status(201).send({
            message: "Fotos cadastradas com sucesso!",
            data: {}
        });
    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao cadastrar as fotos do usuário!",
            data: {
                error
            }
        });
    };
};