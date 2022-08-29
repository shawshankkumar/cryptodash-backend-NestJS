import * as jwt from 'jsonwebtoken';

const key = process.env.JWT_KEY || "m@c&chee$e12";

export const signJwt = (email: string) => {
    return jwt.sign(JSON.stringify({email, createdAt:+new Date()}), key);
}

export const verifyJwt = (token: string) => {
    return jwt.verify(token, key );
}