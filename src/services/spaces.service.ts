import { S3 } from 'aws-sdk';
import { spacesConfig } from '../config/spaces.config';
import { injectable } from 'inversify';
import { ISpacesService } from '../interfaces/spaces.service.interface';

@injectable()
export class SpacesService implements ISpacesService {
  private spacesEndpoint = new S3({
    endpoint: spacesConfig.endpoint,
    accessKeyId: spacesConfig.accessKeyId,
    secretAccessKey: spacesConfig.secretAccessKey,
  });

  public async downloadFile(fileName: string): Promise<Buffer> {
    try {
        const downloadParams = {
            Bucket: spacesConfig.bucket,
            Key: fileName,
          };
      
          const downloadResult = await this.spacesEndpoint.getObject(downloadParams).promise();
      
          return downloadResult.Body as Buffer;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  extractPathFromUrl(url: string): string {
    // Assuming the URL has the following format: https://[domain]/[path]
    const match = url.match(/https:\/\/[^/]+\/(.+)/);
    if (match && match[1]) {
        // decode the path to get the original file name
        return decodeURIComponent(match[1]);
    }
    throw new Error(`Invalid URL: ${url}`);
  }
  
    extractFileNameFromPath(path: string): string {
        // Assuming the path has the following format: [path]/[path]/[file name]
        // extract the file name from the path which is the last part of the path
        const match = path.match(/[^/]+$/);
        if (match && match[0]) {
            return match[0];
        }
        throw new Error(`Invalid path: ${path}`);
    }
    
}