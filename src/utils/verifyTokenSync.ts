import jwt, { JwtPayload } from 'jsonwebtoken';

function verifyTokenSync(token: string, secret: string): JwtPayload | null {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (err) {
        // console.error('Token verification failed:', err);
        return null;
    }
}

export default verifyTokenSync