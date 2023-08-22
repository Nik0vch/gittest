import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {

    constructor(private readonly jwtService: JwtService)
    {}

    async genetateAccessToken(user){
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: "secretWord",
            expiresIn: "10m"
        });
    }
    async generateRefreshToken(user){
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: "secretRefreshWord",
            expiresIn: "20m"
        });
    }

    async existToken(token){
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: "secretWord"});
            return payload
        } catch(e) {
            throw new UnauthorizedException()
        }
    }

    async existRefreshToken(token){
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: "secretRefreshWord"});
            return payload
        } catch(e) {
            throw new UnauthorizedException()
        }
    }

    
}
