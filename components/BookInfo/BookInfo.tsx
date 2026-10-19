import { Books } from '@/types/books';
import css from './BookInfo.module.css'
import Image from 'next/image';
import Button from '../Button/Button';
import { addRecommendedBook } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    data: Books;
    onSuccess: () => void;
}
const BookInfo = ({data, onSuccess}: Props) => {
    
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => addRecommendedBook(data._id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['books'] })
            await queryClient.invalidateQueries({ queryKey: ['own'] })

            onSuccess()
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : String(error))
        },
    })

    return(
        
            <ul className={css.list}>
                
                <li key={data._id} className={css.item}>
                    <Image 
                        className={css.img}
                        src={data.imageUrl} 
                        alt={data.title}
                        width={140}
                        height={213}/>

                    <div className={css.textWrap}>
                        <h2 className={css.title}>{data.title.charAt(0).toUpperCase() + data.title.slice(1, 10).toLocaleLowerCase()}</h2>
                        <p className={css.name}>{data.author}</p>
                    </div>

                    <span className={css.span}>{data.totalPages} pages</span>
                           
                    <Button 
                        onClick={() => mutate()}
                        variant='addLibrary'>
                            Add to library
                    </Button>
                </li>
                
            </ul>

        
    )
}

export default BookInfo