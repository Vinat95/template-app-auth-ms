import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from 'response/response.interceptor';
import { ResponseService } from 'response/response.service';
import { ResponseMiddleware } from 'response/response.middleware';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ResponseService, ResponseInterceptor, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
