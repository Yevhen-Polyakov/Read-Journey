'use client'

import { useForm } from 'react-hook-form'
import css from './Filters.module.css'
import cssInput from '../RegisterForm/RegisterForm.module.css'
import Button from '../Button/Button'

type FilterForm = {
    queryBook: string;
    queryAuthor: string;
}

type Props = {
    onSubmit: (data: FilterForm)=> void
    onClear: (field: 'queryBook' | 'queryAuthor')=> void;
}

const Filters = ({onSubmit, onClear}: Props) => {
const {register, handleSubmit,} = useForm<FilterForm>()

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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

                   <input
                    className={cssInput.input} 
                    type="text"
                    placeholder="The author::"
                    autoComplete="off"
                    {...register("queryAuthor", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>)=> {
                            if(e.target.value === ''){
                                onClear('queryAuthor')
                            }
                        }
                    })} />
                </label>

                <Button
                    type='submit'
                    aria-label="To apply"
                    variant="filter"
                    >To apply
                </Button>

            </form>

            
        </>
    )
}

export default Filters