import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {

    constructor(private readonly jwtService: JwtService)
    {}

    async genetateJwtToken(user){
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: "secretWord",
            expiresIn: "20s"
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

    // async refreshToken(){

    // }
}
