'use client'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../Button/Button'
import cssForm from '../Filters/Filters.module.css'
import cssInput from '../RegisterForm/RegisterForm.module.css'
import css from './AddReading.module.css'
import { readingFinish, readingStart } from '@/lib/api/clientApi'
import type { LibraryBook } from '@/types/books'
import toast from 'react-hot-toast'
import axios from 'axios'

const createSchema = (totalPages?: number, minPage = 1) => yup.object({
    startPage: yup
        .number()
        .transform((value, originalValue) => originalValue === '' ? undefined : value)
        .typeError('Enter the page number')
        .required('Enter the page number')
        .integer('The page number must be an integer')
        .min(minPage, minPage > 1 ? `The page cannot be less than ${minPage}` : 'The page number must be greater than 0')
        .max(totalPages ?? Infinity, `The book has only ${totalPages} pages`),
})

type AddReadingForm = yup.InferType<ReturnType<typeof createSchema>>

type Props = {
    bookId: string;
    totalPages?: number;
    isReading?: boolean;
    minPage?: number;
    onSubmit?: (book: LibraryBook) => void;
}

const AddReading = ({ bookId, totalPages, isReading = false, minPage, onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddReadingForm>({
        resolver: yupResolver(createSchema(totalPages, minPage)),
        mode: 'onBlur',
    })

    const handleFormSubmit = async (data: AddReadingForm) => {
        try {
            const action = isReading ? readingFinish : readingStart
            const book = await action(bookId, data.startPage)
            toast.success(isReading ? 'Reading stopped' : 'Reading started')
            reset()
            onSubmit?.(book)
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.error ?? 'Request failed'
                : 'Something went wrong'
            toast.error(message)
        }
    }

    return (
        <form className={`${cssForm.form} ${css.marginBottom}`} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <label className={css.label}>
                <span className={css.span}>{isReading ? 'Stop page:' : 'Start page:'}</span>

                <input
                    className={cssInput.input}
                    type="number"
                    placeholder="Page number:"
                    autoComplete="off"
                    min={1}
                    step={1}
                    {...register('startPage')}
                />

                {errors.startPage && (
                    <p className={cssInput.error}>{errors.startPage.message}</p>
                )}
            </label>

            <Button 
                className={css.marginBottomBtn}
                type="submit" 
                variant="addBook">
                    {isReading ? 'To stop' : 'To start'}
            </Button>
        </form>
    )
}

export default AddReading

