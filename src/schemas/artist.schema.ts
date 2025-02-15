import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;
  @Prop({ default: null })
  info: string;
  @Prop({ type: String, default: null })
  image: string | null;
  @Prop({ default: false, required: true })
  isPublished: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
