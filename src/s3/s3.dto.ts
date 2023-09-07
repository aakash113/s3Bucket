import {uuid} from "aws-sdk/clients/customerprofiles";

export class CreateBucketDto {
    readonly name!: string;
}

export class UploadObjectDto {
    bucketName!: string;
}

export class EditObjectDto {
    bucketName!: string;
    objectKey! : uuid;
    newData! : string;
}

export class ListObjectsDto {
    bucketName!: string;
}

export class DeleteObjectDto {
    bucketName!: string;
    objectKey!: uuid;
}
