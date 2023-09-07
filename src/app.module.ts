import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from './s3/s3.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/abcd'),
        MulterModule.register({
            dest: './uploads',
        }),
        S3Module,
    ],
})
export class AppModule {}
