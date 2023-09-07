import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cors());

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
