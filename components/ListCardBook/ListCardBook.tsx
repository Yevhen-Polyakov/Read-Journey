import { Books } from "@/types/books"
import ItemCardBook from "../ItemCardBook/ItemCardBook"
import css from './ListCardBook.module.css'

type Props = {
    data: Books[];
    
}

const ListCardBook = ({data, }: Props) => {
    return(
        <ul className={css.list}>
            
            {data.map((book, index)=> (
                <ItemCardBook key={book._id} book={book} loading={index === 0 ? "eager" : "lazy"}>
                    
                </ItemCardBook>
            ))}
            

        </ul>
    )
}

export default ListCardBook