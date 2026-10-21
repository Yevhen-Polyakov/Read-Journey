import { Books } from '@/types/books'
import css from './RecommendedBooks.module.css'
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import cssIcon from '../Icon/Icon.module.css'
import { useState } from 'react';
import { useBookModalStore } from '@/lib/store/bookModalStore';
import Modal from '../Modal/Modal';
import BookInfo from '../BookInfo/BookInfo';
import GoodJob from '../GoodJob/GoodJob';

type Props = {
    results: Books[];
    page: number;
}
const RecommendedBooks = ({results}: Props) => {
    const [showGoodJob, setShowGoodJob] = useState(false)
    const selectedBook = useBookModalStore((state) => state.selectedBooks)
    const openBooks = useBookModalStore((state) => state.openBooks)
    const closeBook = useBookModalStore((state) => state.closeBook)

    const handleModalClose = () => {
        setShowGoodJob(false)
        closeBook()
    }

    return(
        <div className={css.recommendedBooks}>
            <h2 className={css.title}>Recommended books</h2>
            <ul className={css.list}>
                {results?.slice(0, 3).map((book)=> (
                    <li className={css.item} key={book._id}>
                        <button
                            className={css.bookButton}
                            type="button"
                            aria-label={`Open ${book.title} by ${book.author}`}
                            onClick={() => openBooks(book)}
                        >
                            <Image
                                className={css.img}
                                src={book.imageUrl}
                                width={71}
                                height={107}
                                alt=""/>
                            <div className={css.infoBook}>
                                <h3 className={css.titleBook}>{book.title.charAt(0).toUpperCase() + book.title.slice(1, 13).toLocaleLowerCase()}</h3>
                                <p className={css.name}>{book.author}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <Modal variant={showGoodJob ? "goodJob" : "previewBook"} onClose={handleModalClose}>
                    {showGoodJob ? (
                        <GoodJob />
                    ) : (
                        <BookInfo data={selectedBook} onSuccess={() => setShowGoodJob(true)} />
                    )}
                </Modal>
            )}

                <Link className={css.link} href='/recommended'>
                    <span>Home</span>
                    <Icon variant='arrow' className={cssIcon.arrow}/>
                </Link>
            
        </div>
    )
}

export default RecommendedBooks