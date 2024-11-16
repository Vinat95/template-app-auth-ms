import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import { Auth0JwtStrategyConfig } from "./jwt-strategy.interface";

export abstract class BaseJwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: Auth0JwtStrategyConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.jwksUri,
      }),
      audience: config.audience,
      issuer: config.issuer,
      algorithms: config.algorithms,
    });
  }

  abstract validate(payload: any): any;
}
