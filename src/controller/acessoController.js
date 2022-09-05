import Database from '../config/db.js';

const getAllAcessosQuery = async () => {
    const { rows } = await Database.query(`SELECT * FROM tb_user_catraca`);
    return rows;
}

const getAcessosByCpfQuery = async (cpf) => { 
    const { rows } = await Database.query(`SELECT * FROM tb_user_catraca WHERE usuario_cpf = $1`, [cpf]);
    return rows;
}

const getAcessosByIdCatracaQuery = async (idCatraca) => {
    const { rows } = await Database.query(`SELECT * FROM tb_user_catraca WHERE catraca_idcatraca = $1`, [idCatraca]);
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

        if(acessos.length > 0) {
            return res.status(200).send({
                message: "Acessos do CPF recuperados com sucesso.",
                data: {
                    acessos
                }
            });
        }

        return res.status(400).send({
            message: "O CPF informado não possui acessos",
            data: {}
        });

    } catch (error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar os acessos deste CPF",
            data: {
                error
            }
        });
    }
}

export const getAcessoByIdCatraca = async (req, res) => { 
    const { idCatraca } = req.params;
    try {
        const acessos = await getAcessosByIdCatracaQuery(idCatraca);

        if(acessos.length > 0) {
            return res.status(200).send({
                message: "Acessos da catraca recuperados com sucesso.",
                data: {
                    acessos
                }
            });
        }

        return res.status(400).send({
            message: "A catraca não possui acessos",
            data: {}
        });
        
    } catch(error) {
        return res.status(400).send({
            message: "Houve um erro ao recuperar os acessos desta catraca",
            data: {
                error
            }
        });
    }
}
