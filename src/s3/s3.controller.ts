import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Query, Delete, Patch } from '@nestjs/common';
import { S3Service } from './s3.service';
import { CreateBucketDto, UploadObjectDto, ListObjectsDto, DeleteObjectDto, EditObjectDto } from './s3.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @Post('create-bucket')
    async createBucket(@Body() createBucketDto: CreateBucketDto) {
        return this.s3Service.createBucket(createBucketDto);
    }

    @Post('upload-object')
    @UseInterceptors(FileInterceptor('file'))
    async uploadObject(
        @Body() uploadObjectDto: UploadObjectDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.s3Service.uploadObject(uploadObjectDto, file);
    }

    @Get('list-objects')
    async listObjects(@Query() listObjectsDto: ListObjectsDto) {
        return this.s3Service.listObjects(listObjectsDto);
    }

    @Delete('delete-object')
    async deleteObject(@Query() deleteObjectDto: DeleteObjectDto) {
        return this.s3Service.deleteObject(deleteObjectDto);
    }

    @Patch('edit-object')
    async editObject(@Body() editObjectDto: EditObjectDto) {
        return this.s3Service.editObject(editObjectDto);
    }

    @Get('get-object')
    async getObjectData(@Query('bucketName') bucketName: string, @Query('objectKey') objectKey: string) {
        const data = await this.s3Service.getObjectData(bucketName, objectKey);
        return {
            data: data.toString('utf-8'),
        };
    }
}
