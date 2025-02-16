import { Injectable } from '@nestjs/common';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.shema';
import { randomUUID } from 'crypto';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async seed() {
    await this.artistModel.deleteMany({});
    await this.albumModel.deleteMany({});
    await this.trackModel.deleteMany({});
    await this.userModel.deleteMany({});

    await this.userModel.create(
      {
        email: 'abc@gmail.com',
        password: 'abc',
        displayName: 'ABC',
        token: randomUUID(),
        role: 'admin',
      },
      {
        email: 'xyz@gmail.com',
        password: 'xyz',
        displayName: '  XYZ',
        token: randomUUID(),
        role: 'user',
      },
    );

    const [twoPac, notoriousBig, snoopDogg] = await this.artistModel.create(
      {
        name: '2Pac',
        image: 'fixtures/2pac.jpg',
        info: 'Rap',
        isPublished: true,
      },
      {
        name: 'The Notorious B.I.G.',
        image: 'fixtures/notorious.jpg',
        info: 'Hip-Hop',
        isPublished: true,
      },
      {
        name: 'Snoop Dogg',
        image: 'fixtures/snoopDogg.jpg',
        info: 'Rap',
        isPublished: false,
      },
    );

    const [
      All_Eyez_on_Me,
      Loyal_to_the_Game,
      Ready_to_Die,
      Greatest_Hits,
      thaDoggfather,
    ] = await this.albumModel.create(
      {
        title: 'All Eyez on Me',
        artist: twoPac._id,
        yearOfIssue: 1996,
        image: 'fixtures/all_eyez_on_me.jpg',
        isPublished: true,
      },
      {
        title: 'Loyal to the Game',
        artist: twoPac._id,
        yearOfIssue: 2004,
        image: 'fixtures/loyal_to_the_game.jpg',
        isPublished: true,
      },
      {
        title: 'Ready to Die',
        artist: notoriousBig._id,
        yearOfIssue: 1994,
        image: 'fixtures/readytodie.jpeg',
        isPublished: true,
      },
      {
        title: 'Greatest Hits',
        artist: notoriousBig._id,
        yearOfIssue: 2007,
        image: 'fixtures/greatest_hits.jpg',
        isPublished: true,
      },
      {
        title: 'Tha Doggfather',
        artist: snoopDogg._id,
        yearOfIssue: 1996,
        image: 'fixtures/thaDoggfather.jpg',
        isPublished: false,
      },
    );

    await this.trackModel.create(
      {
        title: 'Soldier Like Me (Return of the Soulja)',
        album: Loyal_to_the_Game._id,
        duration: '99:99',
        number: 1,
        isPublished: true,
      },
      {
        title: 'The Uppercut',
        album: Loyal_to_the_Game._id,
        duration: '99:99',
        number: 2,
        isPublished: true,
      },
      {
        title: 'Out on Bail',
        album: Loyal_to_the_Game._id,
        duration: '99:99',
        number: 3,
        isPublished: true,
      },
      {
        title: 'Black Cotton',
        album: Loyal_to_the_Game._id,
        duration: '99:99',
        number: 4,
        isPublished: true,
      },
      {
        title: 'Loyal to the Game',
        album: Loyal_to_the_Game._id,
        duration: '99:99',
        number: 5,
        isPublished: true,
      },

      {
        title: 'Picture Me Rollin',
        album: All_Eyez_on_Me._id,
        duration: '99:99',
        number: 1,
        isPublished: true,
      },
      {
        title: 'Can’t C Me',
        album: All_Eyez_on_Me._id,
        duration: '99:99',
        number: 2,
        isPublished: true,
      },
      {
        title: 'No More Pain',
        album: All_Eyez_on_Me._id,
        duration: '99:99',
        number: 3,
        isPublished: true,
      },
      {
        title: 'Only God Can Judge Me',
        album: All_Eyez_on_Me._id,
        duration: '99:99',
        number: 4,
        isPublished: true,
      },
      {
        title: 'All Eyez on Me',
        album: All_Eyez_on_Me._id,
        duration: '99:99',
        number: 5,
        isPublished: true,
      },

      {
        title: 'Gimme The Loot',
        album: Ready_to_Die._id,
        duration: '99:99',
        number: 1,
        isPublished: true,
      },
      {
        title: 'Warning',
        album: Ready_to_Die._id,
        duration: '99:99',
        number: 2,
        isPublished: true,
      },
      {
        title: 'Ready To Die',
        album: Ready_to_Die._id,
        duration: '99:99',
        number: 3,
        isPublished: true,
      },
      {
        title: 'The What',
        album: Ready_to_Die._id,
        duration: '99:99',
        number: 4,
        isPublished: true,
      },
      {
        title: 'Respect',
        album: Ready_to_Die._id,
        duration: '99:99',
        number: 5,
        isPublished: true,
      },

      {
        title: 'Juicy',
        album: Greatest_Hits._id,
        duration: '99:99',
        number: 1,
        isPublished: true,
      },
      {
        title: 'Big Poppa',
        album: Greatest_Hits._id,
        duration: '99:99',
        number: 2,
        isPublished: true,
      },
      {
        title: 'Warning',
        album: Greatest_Hits._id,
        duration: '99:99',
        number: 3,
        isPublished: true,
      },
      {
        title: 'Unbelievable',
        album: Greatest_Hits._id,
        duration: '99:99',
        number: 4,
        isPublished: true,
      },
      {
        title: 'Niggas Bleed',
        album: Greatest_Hits._id,
        duration: '99:99',
        number: 5,
        isPublished: true,
      },
      {
        title: 'Ride 4 Me',
        album: thaDoggfather._id,
        duration: '99:99',
        number: 1,
        isPublished: false,
      },
      {
        title: 'Gold Rush',
        album: thaDoggfather._id,
        duration: '99:99',
        number: 2,
        isPublished: false,
      },
      {
        title: 'You Thought',
        album: thaDoggfather._id,
        duration: '99:99',
        number: 3,
        isPublished: false,
      },
    );
  }
}
