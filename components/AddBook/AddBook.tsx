'use client'

import cssInput from '../RegisterForm/RegisterForm.module.css'
import css from '../Filters/Filters.module.css'
import Button from '../Button/Button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addBook } from '@/lib/api/clientApi'
import toast from 'react-hot-toast'
import GoodJob from '../GoodJob/GoodJob'
import Modal from '../Modal/Modal'
import cssMargin from "../Button/Button.module.css"

export const filterSchema = yup.object({
    queryBook: yup
    .string()
    .trim()
    .required('Enter a book title'),

    queryAuthor: yup
    .string()
    .trim()
    .required('Enter an author'),

    totalPages: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Enter the number of page')
    .required('Enter the number of page')
    .integer('the number of pages must be an integer')
    .positive('The number of pages must be greater than 0')
    
})

type FiltersLibraryForm = yup.InferType<typeof filterSchema>

type Props = {
    onSubmit: (data: FiltersLibraryForm)=> void;
    onClear: (field: 'queryBook' | 'queryAuthor' | 'totalPages')=> void;
}

const FiltersMyLibrary = ({onSubmit, onClear}: Props) => {
    const {register, handleSubmit, formState: {errors},} = useForm<FiltersLibraryForm>({resolver: yupResolver(filterSchema), mode: 'onBlur'})
    const queryClient = useQueryClient()

    const {mutate, isSuccess, reset} = useMutation({
        mutationFn: (data: FiltersLibraryForm) => addBook({
            title: data.queryBook,
            author: data.queryAuthor,
            totalPages: data.totalPages,
        }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['own'] })
        },

        onError: (error) => {
            toast.error(error instanceof Error ? error.message : String(error))
        },
    })

      if (isSuccess) {
          return <Modal variant='goodJob' onClose={reset}>
            <GoodJob/>
        </Modal>
    }

    const handleFormSubmit = (data: FiltersLibraryForm) => {
        onSubmit(data)
        mutate(data)
    }

    return (
            
             <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
                <label className={css.label}>
                    <span className={css.span}>Filters:</span>

                <input
                    className={cssInput.input} 
                    type="text"
                    placeholder="Book title:"
                    autoComplete="off"
                    {...register("queryBook", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if(e.target.value === ''){
                            onClear('queryBook')
                        }
                        }
                    })}/>

                     {errors.queryBook && (
                    <p className={cssInput.error}>{errors.queryBook.message}</p>
                )}

                <input
                    className={cssInput.input} 
                    type="text"
                    placeholder="The author:"
                    autoComplete="off"
                    {...register("queryAuthor", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>)=> {
                            if(e.target.value === ''){
                                onClear('queryAuthor')
                            }
                        }
                    })}/>

                     {errors.queryAuthor && (
                    <p className={cssInput.error}>{errors.queryAuthor.message}</p>
                )}

                <input
                    className={cssInput.input} 
                    type="number"
                    placeholder="Number of pages:"
                    autoComplete="off"
                    min={1}
                    step={1}
                    {...register("totalPages", {
                         valueAsNumber: true,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>)=> {
                            if(e.target.value === ''){
                                onClear('totalPages')
                            }
                        }
                    })}/>

                    {errors.totalPages && (
                        <p className={cssInput.error}>
                            {errors.totalPages.message}
                        </p>
                    )}
                </label>

                <Button
                    className={cssMargin.marginBottom}
                    type='submit'
                    aria-label="To apply"
                    variant="addBook"
                    >Add book
                </Button>

            </form>

    )
}

export default FiltersMyLibrary