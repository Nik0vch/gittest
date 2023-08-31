import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    private readonly SECRET_ACCESS = this.configService.get<string>("SECRET_ACCESS");
    private readonly ACCESS_TIME = this.configService.get<string>("ACCESS_TIME");
    private readonly SECRET_REFRESH = this.configService.get<string>("SECRET_REFRESH");
    private readonly REFRESH_TIME = this.configService.get<string>("REFRESH_TIME");

    async genetateAccessToken(user) {
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: this.SECRET_ACCESS,
            expiresIn: this.ACCESS_TIME
        });
    }
    async generateRefreshToken(user) {
        const payload = { user };
        return this.jwtService.sign(payload, {
            secret: this.SECRET_REFRESH,
            expiresIn: this.REFRESH_TIME
        });
    }

    async existToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.SECRET_ACCESS });
            return payload
        } catch (e) {
            throw new UnauthorizedException()
        }
    }

    async existRefreshToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.SECRET_REFRESH });
            return payload
        } catch (e) {
            throw new UnauthorizedException()
        }
    }


}
