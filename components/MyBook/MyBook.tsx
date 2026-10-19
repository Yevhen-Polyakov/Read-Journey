import Image from 'next/image'
import type { LibraryBook, } from '@/types/books'
import css from './MyBook.module.css'
import Icon from '../Icon/Icon';

type Props = {
    book: LibraryBook;
    isReading: boolean;
}

const MyBook = ({ book, isReading,  }: Props) => {

    return (
        <div className={css.myBook}>
            <div className={css.headerTitle}>
                <h2 className={css.heading}>My reading</h2>
                
                {book.timeLeftToRead && (
                    <p className={css.timeBook}>{book.timeLeftToRead.hours} hours and {book.timeLeftToRead.minutes} minutes left</p>
                )}
                
            </div>

            <div className={css.wrap}>

                {book.imageUrl ? (
                    <Image
                        className={css.cover}
                        src={book.imageUrl}
                        alt={book.title}
                        width={137}
                        height={208}
                        priority
                    />
                ) : (
                    <div className={css.placeholder} aria-hidden="true" />
                )}

                <div className={css.info}>
                    <h3 className={css.title}>{book.title}</h3>
                    <p className={css.author}>{book.author}</p>
                </div>

                {isReading ? (<Icon variant='read'/>) : (<Icon variant='stop'/>)}
            </div>
        </div>
    )
}

export default MyBook
