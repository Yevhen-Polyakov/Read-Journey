'use client'

import css from './Recommended.module.css'
import ListCardBook from '../ListCardBook/ListCardBook'
import Pagination from '../Pagination/Pagination'
import { Books } from '@/types/books'
import { BooksResponse } from '@/lib/api/clientApi'

type Props = {
    data: BooksResponse;
    results: Books[];
    page: number;
    onPageChange: (page: number) => void;
}

const Recommended = ({data, results, page, onPageChange, }: Props) => {

    return(
        <div className={css.recommendedBooks}>
            <div className={css.titleWrap}>
                 <h1 className={css.title}>Recommended</h1>
                 {data && (
                    <Pagination
                        totalPages={data.totalPages}
                        currentPage={page}
                        onPageChange={onPageChange}
                    />
                 )}
            </div>
           
            <ListCardBook data={results} />
        </div>
    )
}

export default Recommended