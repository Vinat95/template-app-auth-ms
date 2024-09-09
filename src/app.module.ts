import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResponseInterceptor } from "response/response.interceptor";
import { ResponseService } from "response/response.service";
import { ResponseMiddleware } from "response/response.middleware";
import { JwtStrategy } from "./jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { MulterModule } from "@nestjs/platform-express";
import { UploadController } from "./aws s3/s3.controller";
import { S3Service } from "./aws s3/s3.service";
import { memoryStorage } from "multer";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    MulterModule.register({
      storage: memoryStorage(), // Usa memoryStorage per ottenere file.buffer
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Imposta le variabili d'ambiente come globali
    }),
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    ResponseService,
    ResponseInterceptor,
    JwtStrategy,
    S3Service,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
