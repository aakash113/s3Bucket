import  { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBucketDto, UploadObjectDto, ListObjectsDto, DeleteObjectDto, EditObjectDto } from './s3.dto';
import { Bucket, Object } from './s3.schema';


@Injectable()
export class S3Service {
    constructor(
        @InjectModel(Bucket.name) private readonly bucketModel: Model<typeof Bucket>,
        @InjectModel(Object.name) private readonly objectModel: Model<Object>,
    ) {}

    async createBucket(createBucketDto: CreateBucketDto): Promise<typeof Bucket> {
        const { name } = createBucketDto;
        const existingBucket = await this.bucketModel.findOne({ name }).exec();

        if (existingBucket) {
            throw new NotFoundException('Bucket already exists');
        }

        const createdBucket = new this.bucketModel(createBucketDto);
        return createdBucket.save();
    }

    async uploadObject(uploadObjectDto: UploadObjectDto, file: Express.Multer.File): Promise<Object> {
        const { bucketName } = uploadObjectDto;
        const objectKey = file.originalname;
        const data = file.buffer;
        const object = new this.objectModel({ bucketName, objectKey, data });
        return object.save();
    }

    async listObjects(listObjectsDto: ListObjectsDto): Promise<Object[]> {
        const { bucketName } = listObjectsDto;
        return this.objectModel.find({ bucketName }).exec();
    }

    async deleteObject(deleteObjectDto: DeleteObjectDto): Promise<void> {
        const { bucketName, objectKey } = deleteObjectDto;
        await this.objectModel.deleteOne({ bucketName, objectKey }).exec();
    }

    async editObject(editObjectDto: EditObjectDto): Promise<Object> {
        const { bucketName, objectKey, newData } = editObjectDto;
        const updatedObject = await this.objectModel.findOneAndUpdate(
            { bucketName, objectKey },
            { data: newData },
            { new: true },
        ).exec();

        if (!updatedObject) {
            throw new NotFoundException('Object not found');
        }

        return updatedObject;
    }

    async getObjectData(bucketName: string, objectKey: string): Promise<Buffer> {
        const object = await this.objectModel.findOne({ bucketName, objectKey }).exec();
        if (!object) {
            throw new NotFoundException('Object not found');
        }
        return object.get('data');
    }
}
