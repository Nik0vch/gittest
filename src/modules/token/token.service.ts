import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {

    constructor(private readonly jwtService: JwtService)
    {}

    async genetateJwtToken(user){
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: "secretWord",
            expiresIn: 600
        });
    }
}