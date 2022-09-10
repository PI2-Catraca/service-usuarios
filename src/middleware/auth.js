import jwt from "jsonwebtoken";
import auth from "../config/auth.js";

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send({ error: 'Token não fornecido.'});

    const headerParts = authHeader.split(' ');

    if(!headerParts.lenght === 2) return res.status(401).send({ error: 'Token deve seguir o formato Bearer token'});

    const [scheme, token] = headerParts;

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido'});
        req.id = decoded.id;
        return next();
    });
};