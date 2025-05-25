import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { CurrentUserInterceptor } from 'common/current-user.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from 'nestjs-redoc';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('SmartCondo API')
    .setDescription('API documentation for SmartCondo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Redoc setup
  await RedocModule.setup('/api/docs', app, document, {
    title: 'SmartCondo API Docs',
    logo: {
      // url: '',
      backgroundColor: '#F0F0F0',
      altText: 'SmartCondo',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  });

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api', { exclude: ['@mar-azul/portao'] });
  app.use(cookieParser());
  app.useGlobalInterceptors(app.get(CurrentUserInterceptor));

  await app.listen(port);
  console.log(`App started. Listening on port ${port}`);
}
bootstrap().catch((err) => {
  console.log(`Fatal error during initialization:`, err);
  process.exit(1);
});
