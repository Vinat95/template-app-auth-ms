import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseJwtStrategy } from "./base-jwt-strategy.class";
import { Auth0JwtStrategyConfig } from "./jwt-strategy.interface";

@Injectable()
export class JwtStrategy extends BaseJwtStrategy {
  constructor(configService: ConfigService) {
    const config: Auth0JwtStrategyConfig = {
      audience: configService.get<string>("AUTH0_HOST") + "/",
      jwksUri: configService.get<string>("JWKS_URI"),
      issuer: configService.get<string>("ISSUER"),
      algorithms: ["RS256"],
    };
    super(config);
  }

  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
