import { Books } from '@/types/books'
import css from './RecommendedBooks.module.css'
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import cssIcon from '../Icon/Icon.module.css'

type Props = {
    results: Books[];
    page: number;
}
const RecommendedBooks = ({results}: Props) => {
    return(
        <div className={css.recommendedBooks}>
            <h2 className={css.title}>Recommended books</h2>
            <ul className={css.list}>
                {results?.slice(0, 3).map((book)=> (
                    <li className={css.item} key={book._id}>
                        <Image 
                            className={css.img}
                            src={book.imageUrl}
                            width={71}
                            height={107}
                            alt={book.title}/>
                        <div className={css.infoBook}>
                            <h3 className={css.titleBook}>{book.title.charAt(0).toUpperCase() + book.title.slice(1, 13).toLocaleLowerCase()}</h3>
                            <p className={css.name}>{book.author}</p>
                        </div>    
                    </li>
                ))}
            </ul>

                <Link className={css.link} href='/recommended'>
                    <span>Home</span>
                    <Icon variant='arrow' className={cssIcon.arrow}/>
                </Link>
            
        </div>
    )
}

export default RecommendedBooks