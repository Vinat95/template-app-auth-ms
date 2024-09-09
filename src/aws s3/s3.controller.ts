import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "./s3.service";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";

@Controller("upload")
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor("file")) // 'file' è il nome del campo dell'input file
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "File to upload",
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "File successfully uploaded",
    schema: {
      type: "object",
      properties: {
        message: { type: "string" },
        url: { type: "string" },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.uploadImageToS3(file);
    return {
      message: "File uploaded successfully",
      url: result.Location, // URL dell'immagine caricata
    };
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    const result = await this.s3Service.deleteImageFromS3(key);
    return {
      message: 'File deleted successfully',
      data: result,
    };
  }
}
