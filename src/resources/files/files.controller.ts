import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from './file-upload-utils/file-upload.utils';
import { ATTACHMENTS_FOLDER, FILES_PATH } from './constants/constants';
import { FilesService } from './files.service';
import { Auth } from '../auth/auth.decorator';
import { Response } from 'express';
import { diskStorage } from 'multer';

@Controller(FILES_PATH)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @Auth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: ATTACHMENTS_FOLDER,
        filename: editFileName,
      }),
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  @Get('/:filename')
  async getFileById(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: ATTACHMENTS_FOLDER });
  }
}
