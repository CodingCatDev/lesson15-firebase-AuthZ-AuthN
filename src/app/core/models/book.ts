import { Timestamp } from '@firebase/firestore-types';

export class Book {
  ageCategory?: string;
  description?: string;
  fiction?: boolean;
  genre?: string;
  hasAudio?: boolean;
  hasPhotos?: boolean;
  hasVideos?: boolean;
  id?: string;
  publishDate?: Timestamp;
  title?: string;
}
