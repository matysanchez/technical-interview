import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT??'8000';
  await app.listen(port).then(() => {
    console.log(`listening on port ${port} http://localhost:${port}/`)
  });
}
bootstrap();
