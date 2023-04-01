// configuration for the spaces aws-sdk client
import * as dotenv from 'dotenv';

dotenv.config();

const spacesConfig = {
    endpoint: process.env.DO_SPACE_ENDPOINT || 'nyc3.digitaloceanspaces.com',
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY || 'your-spaces-access-key-id',
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY || 'your-spaces-secret-access-key',
    region: process.env.DO_SPACES_REGION || 'nyc3',
    bucket: process.env.DO_SPACE_BUCKET || 'your-spaces-bucket-name',
    cdn: process.env.DO_SPACE_CDN || 'https://your-spaces-cdn.com',
};

export { spacesConfig };