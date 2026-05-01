import { HousingType } from './housing-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  image: string;
  premium: boolean;
  favorite: boolean;
  housingType: HousingType,
  roomsCount: number,
  guestsCount: number,
  price: number;
  facilities: string;
  author: string;
  commentsCount: number;
  coords: string;
}
