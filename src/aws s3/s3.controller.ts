import {
  BadRequestException,
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

  @Post()
  @UseInterceptors(FileInterceptor("file"))
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
    let result;
    if (file) {
      if (file.mimetype !== "image/jpeg") {
        throw new BadRequestException("Solo i file JPEG sono consentiti");
      }
      if (file.size > 100 * 1024) {
        throw new BadRequestException("Il file supera i 100Kb");
      }
      // Caricamento del file su S3
      try {
        result = await this.s3Service.uploadImageToS3(file);
      } catch (error) {
        // Gestione dell'errore di caricamento
        throw new BadRequestException("Errore durante il caricamento del file");
      }
    }

    return {
      message: "File uploaded successfully",
      url: result ? result.Location : "", // URL dell'immagine caricata
    };
  }

  @Delete(":key")
  async deleteFile(@Param("key") key: string) {
    const result = await this.s3Service.deleteImageFromS3(key);
    return {
      message: "File deleted successfully",
      data: result,
    };
  }
}
