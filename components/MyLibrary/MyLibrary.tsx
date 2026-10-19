'use client'

import { useForm } from 'react-hook-form';
import { useState, type FocusEvent } from 'react';
import css from './MyLibrary.module.css'
import Icon from '../Icon/Icon';
import MessageLibrary from '../MessageLibrary/MessageLibrary';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook, getOwnBooks } from '@/lib/api/clientApi';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

type FormValues = {
    category: string;
}

const categories = [
    { label: 'All books', value: '' },
    { label: 'Unread', value: 'unread' },
    { label: 'In progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
] as const

type Category = (typeof categories)[number];

const MyLibrary = () => {
    const [category, setCategory] = useState<Category>(categories[0])
    const [isOpen, setIsOpen] = useState(false)

    const { register, setValue } = useForm<FormValues>({
        defaultValues: { category: '' },
    })
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteBook,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['own'] })
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : String(error))
        },
    })

    const {data, isLoading, error}= useQuery({
        queryKey: ['own', category.value ],
        queryFn: () => getOwnBooks(category.value === '' ? undefined : category.value)
    })

    const hasNoBooks = !isLoading && !error && data?.length === 0

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsOpen(false)
        }
    }

    return (
        <div className={css.myLibrary}>
            <div className={css.wrap}>
                <h1 className={css.title}>My library</h1>

                <div className={css.selectWrap} onBlur={handleBlur}>
                    <input type="hidden" {...register('category')} />
                    <button
                        className={css.select}
                        id="category"
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        aria-controls="category-options"
                        onClick={() => setIsOpen(open => !open)}
                        onKeyDown={event => {
                            if (event.key === 'ArrowDown') setIsOpen(true)
                        }}
                    >
                        {category.label}
                        <Icon className={`${css.img} ${isOpen ? css.imgOpen : ''}`} variant="selectArrow" />
                    </button>
                    {isOpen && (
                        <ul className={css.options} id="category-options" role="menu" aria-labelledby="category">
                            {categories.map(option => (
                                <li key={option.value || 'all'} role="none">
                                    <button
                                        className={css.option}
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={category.value === option.value}
                                        onClick={() => {
                                            setCategory(option)
                                            setValue('category', option.value, { shouldDirty: true })
                                            setIsOpen(false)
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {isLoading && <Loader />}

            {error && <p>Failed to load books.</p>}

            {hasNoBooks && category.value === '' && (
                <MessageLibrary />
            )}

            {hasNoBooks && category.value !== '' && (
                <p className={css.emptyStatus}>No books with this status.</p>
            )}
            
            {data && data.length > 0 && (
                <ul className={css.bookList}>
                    {data.map((book, index) => (
                        <li className={css.bookItem} key={book._id}>
                            <Link href={`/booksLibrary/${book._id}`} aria-label={`Open ${book.title}`}>
                                {book.imageUrl ? (
                                    <Image
                                        className={css.bookCover}
                                        src={book.imageUrl}
                                        alt={book.title}
                                        width={137}
                                        height={208}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                ) : (
                                    <div className={css.bookCoverPlaceholder} aria-hidden="true" />
                                )}
                            </Link>
                            <div className={css.infoBook}>
                                <div className={css.nameWrap}>
                                    <h2 className={css.bookTitle}>{book.title.charAt(0).toLocaleUpperCase() + book.title.slice(1, 13).toLocaleLowerCase()}</h2>
                                    <p className={css.bookAuthor}>{book.author}</p>
                                </div>

                                <Button 
                                    variant='delete' 
                                    type='button'
                                    aria-label={`Delete ${book.title}`}
                                    onClick={() => deleteMutation.mutate(book._id)}>
                                    <Icon variant='delete'/>
                                </Button>
                            </div>
                             
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default MyLibrary