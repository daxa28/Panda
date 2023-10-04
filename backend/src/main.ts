import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:' + config.get<number>('FRONTEND_PORT'),
  });
  const port = config.get<number>('BACKEND_PORT');
  await app.listen(port || 3005, () => {
    console.log(`App started on port: ${port}`);
  });
}

bootstrap();
