import * as mongoose from 'mongoose';


export const BucketSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

export const ObjectSchema = new mongoose.Schema(
    {
        bucketName: {
            type: String,
            required: true,
        },
        objectKey: {
            type: String,
            required: true,
        },
        data: {
            type: Buffer,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);
export const Bucket = mongoose.model('Bucket', BucketSchema);
export const Object = mongoose.model('Object', ObjectSchema);
