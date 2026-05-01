import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HousingType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, image, premium, favorite, housingType, roomsCount, guestsCount, price, facilities, author, commentsCount, coords]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        preview,
        image,
        premium: !!premium,
        favorite: !!favorite,
        housingType: HousingType[housingType as 'apartment' | 'house' | 'room' | 'hotel'],
        roomsCount: Number.parseInt(roomsCount, 10),
        guestsCount: Number.parseInt(guestsCount, 10),
        price: Number.parseInt(price, 10),
        facilities,
        author,
        commentsCount: Number.parseInt(commentsCount, 10),
        coords,
      }));
  }
}
