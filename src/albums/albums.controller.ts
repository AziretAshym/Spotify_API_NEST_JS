import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../schemas/album.schema";
import {Artist, ArtistDocument} from "../schemas/artist.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateAlbumDto} from "./create-album.dto";
import {diskStorage} from "multer";
import {extname} from "path";

@Controller('albums')
export class AlbumsController {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>,
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>,
    ) {}

    @Get()
    async getAlbums(@Query('artistId') artistId: string) {
        if (artistId) {
            const albums = await this.albumModel.find({ artist: artistId });
            if (!albums) {
                throw new NotFoundException("Album not found!");
            }
            return albums;
        }
        return this.albumModel.find();
    };

    @Get(':id')
    getOneAlbum(@Param('id') id: string) {
        return this.albumModel.findById(id);
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

    async createAlbum(
        @UploadedFile() file: Express.Multer.File,
        @Body() albumDto: CreateAlbumDto
    ) {
        const artist = await this.artistModel.findById(albumDto.artist);
        if (!artist) {
            throw new NotFoundException("Artist not found!");
        }

        const album = new this.albumModel({
            title: albumDto.title,
            artist: albumDto.artist,
            yearOfIssue: albumDto.yearOfIssue,
            image: file && file.filename ? 'uploads/albums/' + file.filename : null,
            isPublished: albumDto.isPublished
        });

        const newAlbum = await album.save();
        return newAlbum;
    }

    @Delete(':id')
    async deleteAlbum(@Param('id') id: string) {
        const album = await this.albumModel.findByIdAndDelete(id);
        if (!album) {
            throw new NotFoundException("Album not found!");
        }
        return { message: "Album deleted successfully." };
    }
}
