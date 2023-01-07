import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { ResponseTransportInterceptor } from './common/interceptors/response-transport.interceptor';

const isProduction = process.env.NODE_ENV === 'production';

function setupDocumentation(app: INestApplication) {
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalInterceptors(
    // new ErrorsInterceptor(),
    new ResponseTransportInterceptor(),
  );
  if (!isProduction) setupDocumentation(app);
  await app.listen(3000);
}
bootstrap();
