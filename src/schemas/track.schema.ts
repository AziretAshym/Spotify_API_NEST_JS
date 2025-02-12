import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Album" })
    album: string;
    @Prop({ required: true })
    duration: string;
    @Prop({ default: null })
    number: number;
    @Prop({ default: false, required: true })
    isPublished: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);