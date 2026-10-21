import { Books, LibraryBook } from '@/types/books';
import css from './BookInfo.module.css'
import Image from 'next/image';
import Button from '../Button/Button';
import { addRecommendedBook, getOwnBooks } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

type Props = {
    data: Books;
    onSuccess: () => void;
}

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()

const isSameBook = (
    book: Pick<Books, '_id' | 'title' | 'author'>,
    selectedBook: Pick<Books, '_id' | 'title' | 'author'>,
) =>
    book._id === selectedBook._id ||
    (normalize(book.title) === normalize(selectedBook.title) &&
        normalize(book.author) === normalize(selectedBook.author))

const BookInfo = ({data, onSuccess}: Props) => {
    
    const queryClient = useQueryClient()
    const isAddingRef = useRef(false)

    const { data: ownBooks, isLoading: isLoadingOwnBooks, isFetching: isFetchingOwnBooks, error: ownBooksError } = useQuery({
        queryKey: ['own', ''],
        queryFn: () => getOwnBooks(),
    })

    const isAdded = ownBooks?.some(book => isSameBook(book, data)) ?? false

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const currentBooks = await getOwnBooks()
            if (currentBooks.some(book => isSameBook(book, data))) {
                throw new Error('This book is already in your library')
            }

            return addRecommendedBook(data._id)
        },
        onSuccess: async (addedBook) => {
            queryClient.setQueryData<LibraryBook[]>(['own', ''], currentBooks => {
                if (!currentBooks || currentBooks.some(book => isSameBook(book, addedBook))) {
                    return currentBooks
                }

                return [...currentBooks, addedBook]
            })
            await queryClient.invalidateQueries({ queryKey: ['books'] })
            await queryClient.invalidateQueries({ queryKey: ['own'] })

            toast.success('Book added to library')
            onSuccess()

        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : String(error))
        },
        onSettled: () => {
            isAddingRef.current = false
        },
    })

    const handlerBook = () => {
        if (isAddingRef.current) {
            return
        }

        if (isLoadingOwnBooks || isFetchingOwnBooks) {
            return
        }

        if (ownBooksError) {
            toast.error('Unable to verify whether this book is already in your library')
            return
        }

        if(isAdded) {
            toast.error('This book is already in your library')
            return
        }

        isAddingRef.current = true
        mutate()
    }

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
                        <h2 className={css.title}>{data.title.slice(0, 32).toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</h2>
                        <p className={css.name}>{data.author}</p>
                    </div>

                    <span className={css.span}>{data.totalPages} pages</span>
                           
                    <Button 
                        onClick={handlerBook}
                        disabled={isLoadingOwnBooks || isFetchingOwnBooks || isPending}
                        variant='addLibrary'>
                            Add to library
                    </Button>
                </li>
                
            </ul>

        
    )
}

export default BookInfo