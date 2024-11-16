export interface Auth0JwtStrategyConfig {
  audience: string;
  jwksUri: string;
  issuer: string;
  algorithms: string[];
}
