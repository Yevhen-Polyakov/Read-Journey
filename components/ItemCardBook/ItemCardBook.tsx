import { Books } from "@/types/books"
import Image from "next/image"
import css from "./ItemCardBook.module.css"
import { useBookModalStore } from "@/lib/store/bookModalStore";

type Props = {
    book: Books;
    loading?: "eager" | "lazy";
}

const ItemCardBook = ({book, loading = "lazy"}: Props) => {
    const openBooks = useBookModalStore((state)=> state.openBooks)

    return(
        
        <li className={css.item} key={book._id}>
            <Image 
            className={css.img}
                src={book.imageUrl}
                width={137}
                height={208}
                alt={book.title}
                loading={loading}
                onClick={() => openBooks(book)}
                />

            <div className={css.textWrap}>
                <h3 className={css.name}>{book.title.charAt(0).toUpperCase() + book.title.slice(1, 20).toLocaleLowerCase()}</h3>
                <p className={css.author}>{book.author}</p>
            </div>    
            
        </li>
    )
}

export default ItemCardBook