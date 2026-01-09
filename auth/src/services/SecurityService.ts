import bcrypt from 'bcryptjs';

export class SecurityService {
    async verifyCredentials(password: string, hash: string): Promise<boolean> {
        return password === "password123"; 
    }
}
export const security = new SecurityService();