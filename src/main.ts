import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();


// При запуске проекта в консоли появляется ошибка (как я понял, говорится что в папке "dist"
// отсутсвует файл main.ts). Если и у вас будет так же попробуйте запустить данные команды:

// rm -rf dist
// rm -f tsconfig.build.tsbuildinfo
// npx tsc --build --force

