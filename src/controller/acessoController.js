import Database from '../config/db.js';

const getAllAcessosQuery = async () => {
    const { rows } = await Database.query(`SELECT * FROM tb_user_catraca`);
    return rows;
}

const getAcessosByCpfQuery = async (cpf) => { 
    const { rows } = await Database.query(`SELECT * FROM tb_user_catraca WHERE usuario_cpf = $1`, [cpf]);
    return rows;
}

export const getAllAcessos = async (req, res) => {
    try {
        const acessos = await getAllAcessosQuery();

        if(acessos.length > 0) {
            return res.status(200).send({
                message: "Acessos recuperados com sucesso.",
                data: {
                    acessos
                }
            });
        }

        return res.status(200).send({
            message: "Não há acessos registrados.",
            data: {
                acessos: []
            }
        });

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar os acessos.",
            data: {
                error
            }
        });
    }
}

export const getAcessoByCpf = async (req, res) => {
    const { cpf } = req.params;

    try {
        const acessos = await getAcessosByCpfQuery(cpf);
        console.log('acessos:', acesso);

        if(acessos.length > 0) {
            return res.status(200).send({
                message: "Acessos do CPF recuperados com sucesso.",
                data: {
                    acessos
                }
            });
        }

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar os acessos deste CPF",
            data: {
                error
            }
        });
    }
}