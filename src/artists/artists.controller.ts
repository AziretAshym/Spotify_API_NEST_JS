import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOneArtist(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/albums',
        filename: (_req, file, callback) => {
          callback(null, crypto.randomUUID() + extname(file.originalname));
        },
      }),
    }),
  )
  async createArtist(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      info: artistDto.info,
      image: file && file.filename ? 'uploads/artists/' + file.filename : null,
      isPublished: artistDto.isPublished,
    });

    const newArtist = await artist.save();
    return newArtist;
  }

  @Delete(':_id')
  async deleteArtist(@Param('_id') _id: string) {
    const artist = await this.artistModel.findByIdAndDelete(_id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return { message: 'Artist deleted successfully!' };
  }
}
