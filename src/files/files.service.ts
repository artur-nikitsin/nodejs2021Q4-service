import { Injectable, UploadedFile } from '@nestjs/common';

@Injectable()
export class FilesService {
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename } = file;
    return {
      filename,
      message: `File successfully saved. You can get it by name ${filename}`,
    };
  }
}
