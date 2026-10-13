export type Books = {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
    recommend: boolean;
}

export type AddNewBok = Pick<Books, 'title' | 'author' | 'totalPages'>

export type LibraryBook = Omit<Books, 'recommend'> & {
    status: 'unread' | 'in-progress' | 'done';
    owner: string;
    progress: BookProgress[];
    timeLeftToRead?: TimeLeftToRead;
}

export type DeleteBookId = {
    message: string;
    id: string;

}

export type ProgressStatus = 'inactive' | 'active' | 'done';

export type BookProgress = {
  _id?: string;
  id?: string;
  readingId?: string;
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: ProgressStatus;
};

export type TimeLeftToRead = {
  hours: number;
  minutes: number;
  seconds: number;
};

