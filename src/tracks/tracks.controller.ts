import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Query} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../schemas/track.schema";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../schemas/album.schema";
import {CreateTrackDto} from "./create-track.dto";

@Controller('tracks')
export class TracksController {
    constructor(
       @InjectModel(Track.name)
       private trackModel: Model<TrackDocument>,
       @InjectModel(Album.name)
       private albumModel: Model<AlbumDocument>,
    ) {}

    @Get()
    async getTracks(@Query('albumId') albumId: string) {
        if (albumId) {
            const tracks = await this.trackModel.find({ albumId });
            if (!tracks) {
                throw new NotFoundException("Albums not found");
            }
            return tracks;
        }
        return this.trackModel.find();
    }

    @Post()
    async createTrack(
        @Body() trackDto: CreateTrackDto
    ) {
        const trackAlbum = await this.albumModel.findById(trackDto.album);
        if (!trackAlbum) {
            throw new NotFoundException("Album not found!");
        }

        const track = new this.trackModel({
            title: trackDto.title,
            album: trackDto.album,
            duration: trackDto.duration,
            number: trackDto.number,
            isPublished: trackDto.isPublished
        });

        const newTrack = await track.save();
        return newTrack;
    }

    @Delete(':id')
    async deleteTrack(@Param('id') id: string) {
        const track = await this.trackModel.findByIdAndDelete(id);
        if (!track) {
            throw new NotFoundException("Track not found!");
        }
        return { message: "Track deleted successfully." };
    }
}
