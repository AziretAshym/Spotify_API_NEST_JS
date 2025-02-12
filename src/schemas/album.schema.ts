import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Artist" })
    artist: string;
    @Prop({ required: true })
    yearOfIssue: number;
    @Prop({ default: null })
    image: string;
    @Prop({ default: false, required: true })
    isPublished: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);