import { HttpService } from "@nestjs/axios";
import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import * as qs from "qs";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  private async getToken(): Promise<string> {
    const url = "https://dev-lwot5qle50opfs87.eu.auth0.com/oauth/token";
    const data = {
      grant_type: "client_credentials",
      client_id: "Q7643334vDbxyqXJH1QFsiYEqNOQpncK",
      client_secret:
        "t93MnEbbtVW4ZaS0FS8ERu6-sRSttQO8l8F0OaZCn622Xwvq50Q5HNO1BRDEr5pE",
      audience: "https://dev-lwot5qle50opfs87.eu.auth0.com/api/v2/",
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await firstValueFrom(
      this.httpService.post(url, qs.stringify(data), { headers })
    );

    return response.data.access_token;
  }

  async getUserDetails(id: string): Promise<any> {
    const token = await this.getToken();

    const url = `https://dev-lwot5qle50opfs87.eu.auth0.com/api/v2/users/${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers })
    );
    return response.data;
  }

  async UpdateUserDetails(id: string, details: UpdateUserDto): Promise<any> {
    try {
      const token = await this.getToken();

      const url = `https://dev-lwot5qle50opfs87.eu.auth0.com/api/v2/users/${id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await firstValueFrom(
        this.httpService.patch(url, details, { headers })
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Errore di risposta dal server Auth0
        const status = error.response.status;
        const message = error.response.data?.message || "Errore sconosciuto";

        if (status === 404) {
          throw new NotFoundException(`Utente non trovato.`);
        } else if (status === 400) {
          throw new BadRequestException(`Richiesta non valida: ${message}`);
        } else if (status === 401) {
          throw new UnauthorizedException("Autenticazione fallita.");
        } else if (status === 403) {
          throw new ForbiddenException("Accesso negato.");
        } else {
          throw new InternalServerErrorException(
            `Errore del server: ${message}`
          );
        }
      } else {
        // Errore di rete o errore non gestito
        throw new InternalServerErrorException(
          "Si è verificato un errore durante l'aggiornamento dei dettagli utente."
        );
      }
    }
  }
}
