
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import {Bucket, BucketSchema, Object, ObjectSchema} from './s3.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Bucket.name, schema: BucketSchema },
            { name: Object.name, schema: ObjectSchema },
        ]),
    ],
    controllers: [S3Controller],
    providers: [S3Service],
})
export class S3Module {}
