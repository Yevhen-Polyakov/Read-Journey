import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'
import Icon from '../Icon/Icon';
     
interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (nextPage: number) => void;
}     

export default function Pagination ({totalPages, currentPage, onPageChange}: PaginationProps) {
    return(
        <ReactPaginate 
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={({selected}) => onPageChange(selected + 1)}
            containerClassName={css.pagination} 
            activeClassName={css.active} 
            pageClassName={css.hiddenPage}
            breakClassName={css.hiddenPage}
            previousLinkClassName={css.arrow}
            nextLinkClassName={css.arrow}
            disabledLinkClassName={css.disabled}
            nextLabel={<Icon variant='next'/>}
            previousLabel={<Icon variant='prev'/>}/>
    )
}